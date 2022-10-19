import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { findByPermission } from '../../repositories/permission-repositories';

export class CreatePermissionController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { permission } = request.all();

      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if (!userAdminRole) {
        throw new Error('Cannot create a new permission');
      }

      const foundPermission = await findByPermission(permission);

      if (foundPermission) {
        throw new Error('Permission exist');
      }

      const permissionData = await prisma.permission.create({
        data: {
          permission
        }
      });
  
      return response.status(201).json({
        permission: permissionData
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
