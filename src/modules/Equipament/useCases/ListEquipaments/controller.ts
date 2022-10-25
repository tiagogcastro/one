import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class ListEquipamentsController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
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
