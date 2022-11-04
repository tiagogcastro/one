import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from '../../repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { findByEmail } from '../../repositories/user-repositories';
import bcrypt from 'bcrypt';
import { Company, User } from '@prisma/client';
import { userInstanceToInstance } from 'src/shared/utils/instanceToInstance';

export interface CreateUserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  username: string;

  company?: {
    name: string;
    id: string;
  };
};

export class CreateUserService {
  async execute(data: CreateUserData, userLoggedId: string) {
    const userData = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      username: data.username,
    };
    
    const adminRole = await findByRole('admin');

    if(!adminRole) {
      throw new Error('admin Role does not exist');
    }

    const defaultRole = await findByRole('default');
    
    if(!defaultRole) {
      throw new Error('default Role does not exist');
    }

    const isCompanyAdminRole = await findByRole('company.admin');

    if(!isCompanyAdminRole) {
      throw new Error('company.admin Role does not exist');
    }

    const userIsAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);
    const userIsAdminCompanyRole = await findUserRoleByRoleIdAndUserId(isCompanyAdminRole.id, userLoggedId);

    const userCompany = await prisma.userCompany.findFirst({
      where: {
        userId: userLoggedId
      },
    });

    if(!userIsAdminRole && !userIsAdminCompanyRole && !userCompany) {
      throw new Error('Você não tem permissão para criar este usuário.');
    }

    const userExist = await findByEmail(data.email);
  
    if(userExist) {
      throw new Error('User email already exist');
    }

    const usernameExist = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    });
  
    if(usernameExist) {
      throw new Error('User username already exist');
    }

    const passwordHashed = await bcrypt.hash(data.password, 10);;

    let company: Company | null = null;
    let user: User | null = {
      ...userData,
      password: passwordHashed
    } as User;
    
    if(data.company?.name && data.company?.id) {
      throw new Error('Please, insert your company id or name');
    }
    
    if(!userIsAdminRole && data.company?.name) {
      throw new Error("Você não tem permissão para criar uma empresa para este usuário");
    }

    if(data.company?.id) {
      company = await prisma.company.findFirst({
        where: {
          id: data.company?.id
        }
      });

      if(!company) {
        throw new Error('Company does not exist');
      }

      user = await prisma.user.create({
        data: {
          ...userData,
          password: passwordHashed
        }
      });

      await prisma.userCompany.create({
        data: {
          userId: user.id,
          companyId: company.id,
        }
      });
    }

    if(data.company?.name) {
      user = await prisma.user.create({
        data: {
          ...userData,
          password: passwordHashed
        }
      });

      company = await prisma.company.create({
        data: {
          name: data.company.name,
          ownerId: user.id
        }
      });

      await prisma.userCompany.create({
        data: {
          userId: user.id,
          companyId: company?.id,
        }
      });

      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: isCompanyAdminRole.id,
        }
      });
    }

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: defaultRole.id,
      }
    });

    return {
      user: userInstanceToInstance(user),
      company
    };
  }
}