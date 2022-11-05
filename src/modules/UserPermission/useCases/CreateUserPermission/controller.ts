import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByPermission } from 'src/modules/Permission/repositories/permission-repositories';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class CreateUserPermissionController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;
    try {
      const { permission, user_id, company_id } = request.all();

      if(!permission) {
        throw new Error('Please enter permission');
      }

      if(!user_id) {
        throw new Error('Please enter user_id');
      }

      if(!company_id) {
        throw new Error('Please enter company_id');
      }

      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const isCompanyAdminRole = await findByRole('company.admin');

      if(!isCompanyAdminRole) {
        throw new Error('company.admin Role does not exist');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);
      const userIsAdminCompanyRole = await findUserRoleByRoleIdAndUserId(isCompanyAdminRole.id, userLoggedId);

      const company = await prisma.company.findFirst({
        where: {
          id: company_id
        }
      });

      if(!company) {
        throw new Error('Company not found');
      }

      const userCompany = await prisma.userCompany.findFirst({
        where: {
          userId: user_id
        }
      });
      
      if (!userCompany) {
        throw new Error('This user has no company');
      }

      if(!userAdminRole || !userIsAdminCompanyRole && userCompany?.companyId !== company_id) {
        throw new Error('You cannot give permission this user');
      }

      const foundPermission = await findByPermission(permission);

      if (!foundPermission) {
        throw new Error('Permission not exist');
      }

      const userToGivePermission = await findById(user_id);

      if (!userToGivePermission) { 
        throw new Error('User to give permission not found');
      }

      const userPermission = await prisma.userPermission.findFirst({
        where: {
          permissionId: foundPermission.id,
          userId: userToGivePermission.id,
          companyId: company_id,
        }
      });

      if(userPermission) {
        throw new Error('User permission exist this company');
      }

      const userPermissionData = await prisma.userPermission.create({
        data: {
          permissionId: foundPermission.id,
          userId: userToGivePermission.id,
          companyId: company_id
        },
        include: {
          permission: true
        }
      });
  
      return response.status(201).json({
        userPermission: userPermissionData,
        userLogged,
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
