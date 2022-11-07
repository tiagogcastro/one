import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByPermission } from 'src/modules/Permission/repositories/permission-repositories';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class RemoveUserPermissionController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { user_id, permission, company_id } = request.qs();

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
  
      const userCompany = await prisma.userCompany.findFirst({
        where: {
          userId: user_id,
        },
      });

      const foundPermission = await findByPermission(permission);

      if (!foundPermission) {
        throw new Error('Permission not exist');
      }

      const foundUserPermission = await prisma.userPermission.findFirst({
        where: {
          companyId: company_id,
          userId: user_id,
          permissionId: foundPermission.id
        }
      })

      if(!foundUserPermission) {
        throw new Error('This user permission from this company does not exist');
      }

      if(!userAdminRole && !userIsAdminCompanyRole && !userCompany) {
        throw new Error('Você não tem permissão para remover esta permissão do usuário.');
      }

      await prisma.userPermission.delete({
        where: {
          id: foundUserPermission.id
        }
      });
  
      return response.status(201).json({
        success: `User Permission ${permission} deleted successfully`
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
