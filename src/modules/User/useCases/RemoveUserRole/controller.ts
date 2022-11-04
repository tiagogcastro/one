import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class RemoveUserRoleController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const userIdToDelete = request.qs().user_id as string;
    const roleId = request.qs().role_id as string;

    try {
      const userToDelete = await findById(userIdToDelete);

      if (!userToDelete) {
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const isAdmin = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if (!isAdmin) {
        throw new Error('Cannot delete user');
      }

      const role = await prisma.role.findUnique({
        where: {
          id: roleId
        }
      });

      if (!role) {
        throw new Error('Role does not exist');
      }

      const userRoleToDelete = await prisma.userRole.findFirst({
        where: {
          userId: userIdToDelete,
          roleId
        }
      });

      if (!userRoleToDelete) {
        throw new Error('User role not found');
      }

      await prisma.userRole.delete({
        where: {
          id: userRoleToDelete.id
        }
      });

      return response
        .status(200)
        .send({
          success: 'User role successfully'
        })
      
    } catch(error) {
      return response
        .status(400)
        .send({
          error: error.message
        })
    }
  }

}