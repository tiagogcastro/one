import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findById } from 'src/modules/User/repositories/user-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class PermissionsThatTheUserDoesNotHaveInCompanyController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { user_id, company_id } = request.qs();

      if(!user_id) {
        throw new Error('Please enter user_id');
      }

      if(!company_id) {
        throw new Error('Please enter company_id');
      }

      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const permissions = await prisma.permission.findMany();

      const userPermissions = await prisma.userPermission.findMany({
        where: {
          userId: user_id,
          companyId: company_id
        },
        select: {
          id: true,
          permission: true,
        }
      });

      const permissionsNotHave = permissions.filter(perm => {
        const perms = userPermissions.find(where => {
          return where.permission.permission === perm.permission;
        })

        return !perms;
      });

      return response.status(200).json(
        permissionsNotHave
      );
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
