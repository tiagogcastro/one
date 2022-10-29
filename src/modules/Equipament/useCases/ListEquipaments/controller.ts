import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { returnValueConverted } from 'src/shared/utils/returnValueConverted';

export class ListEquipamentsController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const { company_id } = request.qs();

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

      if(!company_id) {
        throw new Error('Please enter company_id');
      }

      const userAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

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
          userId: userLogged.id,
          companyId: company_id,
        }
      });
      
      if(!userAdminRole && !userCompany) {
        throw new Error('You cannot add this user to this company');
      }
      
      const equipaments = await prisma.equipament.findMany({
        where: {
          companyId: company.id
        },
        include: {
          EquipamentParameters: {
            select: {
              id: true,
              name: true,
              type: true,
              value: true,
            }
          },
          companyArea: true
        }
      });

      const customEquipaments = equipaments.map(equipament => {
        const data = {
          id: equipament.id,
          name: equipament.name,
          companyAreaId: equipament.companyAreaId,
          hardwareId: equipament.hardwareId,
          updated_at: equipament.updated_at,
          created_at: equipament.created_at,
          params: equipament.EquipamentParameters,
        };

        return {
          ...data,
          params: data.params.map(param => {
            return {
              [param.name]: returnValueConverted(param.value, param.type as any)
            }
          }).reduce((previousValue, current) => {
            return {
              ...previousValue,
              ...current
            }
          }, {})
        }
      })

      return response.status(201).json({
        equipaments: customEquipaments,
        company
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
