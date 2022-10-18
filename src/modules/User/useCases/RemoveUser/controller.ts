import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { deleteUserById, findUserRoleByRoleIdAndUserId } from '../../repositories/user-role-repositories';

export class RemoveUserController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const userIdToDelete = request.headers().user_id as string;

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const userRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if (!userRole) {
        throw new Error('Cannot delete user');
      }

      await deleteUserById(userIdToDelete);

      return response
        .status(200)
        .send({
          success: 'User deleted successfully'
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