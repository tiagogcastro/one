import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class ListUniqueEquipamentController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { equipament_id } = request.qs();

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      if(!equipament_id) {
        throw new Error('Please enter equipament_id');
      }

      const userCompany = await prisma.userCompany.findFirst({
        where: {
          userId: userLoggedId
        }
      });

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if(!userAdminRole && userCompany?.userId !== userLoggedId) {
        throw new Error('You cannot list equipaments from this company');
      }
      
      const company = await prisma.company.findFirst({
        where: {
          id: userCompany?.companyId
        }
      });

      if(!company) {
        throw new Error("This company doesn't exist or you don't own it");
      }

      const foundEquipament = await prisma.equipament.findUnique({
        where: {
          id: equipament_id
        },
      });
      
      if(!foundEquipament) {
        throw new Error('Equipament does not exist');
      }

      return response.status(201).json({
        equipament: foundEquipament,
        company
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
