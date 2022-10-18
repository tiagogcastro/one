import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from '../../repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { findByEmail } from '../../repositories/user-repositories';
import bcrypt from 'bcrypt';

export interface CreateUserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
};

export class CreateUserService {
  async execute(data: CreateUserData, userLoggedId: string) {
    const adminRole = await findByRole('admin');

    if(!adminRole) {
      throw new Error('admin Role does not exist');
    }

    const userHasAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

    if(!userHasAdminRole) {
      throw new Error('Você não tem permissão para criar este usuário.');
    }

    const clientAdmin = await findByRole('client.admin');

    if(!clientAdmin) {
      throw new Error('client.admin Role does not exist');
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

    const user = await prisma.user.create({
      data: {
        ...data,
        password: passwordHashed
      }
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: clientAdmin.id,
      }
    });

    return user;
  }
}