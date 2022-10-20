import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class UpdateEquipamentController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;
   
    try {
      const { owner_company_id, equipament, equipament_id } = request.all();

      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }
      
      if(!owner_company_id) {
        throw new Error('Please enter owner_company_id');
      }

      if(!equipament_id) {
        throw new Error('Please enter equipament_id');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      const company = await prisma.company.findFirst({
        where: {
          ownerId: owner_company_id
        }
      });

      if(!company) {
        throw new Error('Company does not exist');
      }

      if(!userAdminRole && company?.ownerId !== userLoggedId) {
        throw new Error('You does not owner this company');
      }

      let foundEquipament = await prisma.equipament.findUnique({
        where: {
          id: equipament_id,
        }
      });

      foundEquipament = {
        ...equipament || foundEquipament,
      }

      if(!foundEquipament) {
        throw new Error('Equipament does not exist');
      }

      const equipamentCreated = await prisma.equipament.update({
        where: {
          id: equipament_id,
        },
        data: foundEquipament
      });
  
      return response.status(201).json({
        equipament: equipamentCreated,
        userLogged,
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
