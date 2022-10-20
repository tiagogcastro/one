import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class ListEquipamentsController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { owner_company_id } = request.qs();

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      if(!owner_company_id) {
        throw new Error('Please enter owner_company_id');
      }

      const company = await prisma.company.findFirst({
        where: {
          ownerId: owner_company_id
        }
      });

      if(!company) {
        throw new Error("This company doesn't exist or you don't own it");
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if(!userAdminRole && company.ownerId !== userLoggedId) {
        throw new Error('You cannot list equipaments from this company');
      }
      
      const equipaments = await prisma.equipament.findMany({
        where: {
          companyId: company.id
        },
      });

      return response.status(201).json({
        equipaments,
        company
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
