import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class ListUserFromCompanyController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { companyOwnerId } = request.all();

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const company = await prisma.company.findFirst({
        where: {
          ownerId: companyOwnerId
        }
      });

      if(!company) {
        throw new Error("This company doesn't exist or you don't own it");
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if(!userAdminRole && company.ownerId !== userLoggedId) {
        throw new Error('You cannot list users from this company');
      }
      
      const users = await prisma.userCompany.findMany({
        where: {
          userId: companyOwnerId
        },
        select: {
          companyId: true,
          created_at: true,
          updated_at: true,
          user: {
            include: {
              UserPermission: {
                select: {
                  permission: true
                },
              }
            }
          },
        }
      });

      return response.status(201).json({
        users,
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
