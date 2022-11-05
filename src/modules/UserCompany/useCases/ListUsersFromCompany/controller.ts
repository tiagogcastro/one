import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { userInstanceToInstance } from 'src/shared/utils/instanceToInstance';

export class ListUserFromCompanyController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { company_id } = request.qs();

    try {
      if(!company_id) {
        throw new Error('Please, insert a company_id');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const isCompanyAdminRole = await findByRole('company.admin');

      if(!isCompanyAdminRole) {
        throw new Error('company.admin Role does not exist');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);
      const userIsAdminCompanyRole = await findUserRoleByRoleIdAndUserId(isCompanyAdminRole.id, userLoggedId);

      const company = await prisma.company.findFirst({
        where: {
          id: company_id
        }
      });

      if(!company) {
        throw new Error('Company not found');
      }

      const userCompany = await prisma.userCompany.findFirst({
        where: {
          userId: userLoggedId,
        }
      });

      if(!userAdminRole && !userIsAdminCompanyRole && !userCompany) {
        throw new Error('You cannot list users from this company');
      }
      
      const foundUsers = await prisma.userCompany.findMany({
        where: {
          companyId: company_id,
        },
        include: {
          user: {
            include: {
              UserPermission: {
                where: {
                  companyId: company_id
                },
                select: {
                  permission: true
                },
              },
              UserRole: {
                select: {
                  role: true,
                }
              }
            }
          },
        }
      });

      const users = foundUsers.map(user => {
        return {
          ...user.user,
        }
      })

      return response.status(201).json(userInstanceToInstance(users));
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
