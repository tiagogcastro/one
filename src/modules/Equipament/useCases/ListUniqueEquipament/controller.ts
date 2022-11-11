import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { returnValueConverted } from 'src/shared/utils/returnValueConverted';

export class ListUniqueEquipamentController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { company_id, equipament_id } = request.qs();

    try {  
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

      if(!equipament_id) {
        throw new Error('Please enter equipament_id');
      }

      const foundEquipament = await prisma.equipament.findUnique({
        where: {
          id: equipament_id,
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

      if(!foundEquipament) {
        throw new Error('Equipament does not exist');
      }

      const data = {
        id: foundEquipament.id,
        name: foundEquipament.name,
        companyAreaId: foundEquipament.companyAreaId,
        posY: foundEquipament.posY,
        posX: foundEquipament.posX,
        hardwareId: foundEquipament.hardwareId,
        updated_at: foundEquipament.updated_at,
        created_at: foundEquipament.created_at,
        params: foundEquipament.EquipamentParameters,
      };

      const equipament = {
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

      return response.status(201).json({
        equipament,
        company
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
