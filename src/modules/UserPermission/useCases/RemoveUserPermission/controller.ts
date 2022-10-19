import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByPermission } from 'src/modules/Permission/repositories/permission-repositories';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { findUserPermissionByIds } from '../../repositories/user-permission-repositories';

export class RemoveUserPermissionController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { user_id, permission } = request.qs();

      if(!permission) {
        throw new Error('Please enter permission');
      }

      if(!user_id) {
        throw new Error('Please enter user_id');
      }

      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const foundPermission = await findByPermission(permission);

      if (!foundPermission) {
        throw new Error('Permission not exist');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      const company = await prisma.company.findFirst({
        where: {
          ownerId: user_id
        }
      });

      if(!userAdminRole && company?.ownerId !== userLoggedId) {
        throw new Error('You cannot give permission');
      }

      const foundUserPermission = await findUserPermissionByIds(
        foundPermission.id,
        user_id
      );

      if(!foundUserPermission) {
        throw new Error('This user permission does not exist');
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
