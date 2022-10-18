import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event';
import { prisma } from 'src/shared/infra/prisma/client';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { findByRole } from '../../repositories/role-repositories';

export class CreateRoleController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;
    try {
      const { role } = request.all();

      const adminRole = await findByRole('admin');

      if(!adminRole) {
        throw new Error('admin Role does not exist');
      }

      const roleExist = await findByRole(role);

      if(roleExist) {
        throw new Error(`${role} already exists`);
      }

      const userHasAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if(!userHasAdminRole) {
        throw new Error('Você não tem permissão para criar este cargo.');
      }

      const roleData = await prisma.role.create({
        data: {
          role
        }
      });
  
      Event.emit('new:role', {
        newUser: roleData,
      });
  
      return response.status(201).json({role: roleData});
    } catch (error) {
      return response.status(201).json({error: error.message});
    }
  }
}
