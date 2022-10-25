import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class RemoveUserCompanyController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { user_id, company_id } = request.all();

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

      if(!userAdminRole && !userIsAdminCompanyRole) {
        throw new Error('You cannot remove this user to this company');
      }

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
          userId: user_id,
          companyId: company_id,
        }
      });

      if(!userCompany) {
        throw new Error('This user not exist on this company');
      }
      
      await prisma.userCompany.delete({
        where: {
          id: userCompany.id
        }
      });
  
      return response.status(201).json({
        success: `User company  deleted successfully`
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
