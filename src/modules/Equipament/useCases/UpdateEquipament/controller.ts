import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Equipament } from '@prisma/client';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';
import { returnValueConverted } from 'src/shared/utils/returnValueConverted';

export class UpdateEquipamentController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    let equipament: Equipament | null = {} as Equipament;
   
    try {
      const { company_id, equipament_id, equipament_name, params } = request.all();

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
          userId: userLogged.id,
          companyId: company_id,
        }
      });
      
      if(!userAdminRole && !userIsAdminCompanyRole && !userCompany) {
        throw new Error('You cannot add this user to this company');
      }

      if(!equipament_id) {
        throw new Error('Please enter equipament_id');
      }

      equipament = await prisma.equipament.findUnique({
        where: {
          id: equipament_id,
        }
      });
      
      if(!equipament) {
        throw new Error('Equipament does not exist');
      }

      equipament = {
        ...equipament,
        name: equipament_name || equipament.name
      };

      const equipamentUpdated = await prisma.equipament.update({
        where: {
          id: equipament_id,
        },
        data: equipament
      });

      let foundEquipamentsParams = await prisma.equipamentParameters.findMany({
        where: {
          equipamentId: equipament.id,
        }
      });

      const defaultEquipamentParams = Object.entries(params).map(async ([key, value]: [string, string]) => {
        const founded = foundEquipamentsParams.find(foundParam => foundParam.name === key);

        if(founded) {
          const result = await prisma.equipamentParameters.update({
            data: {
              ...founded,
              value: String(value),
              type: typeof value, 
            },
            where: {
              id: founded.id
            }
          });

          return {
            [result.name]: returnValueConverted(result.value, result.type as any),
          }
        }
      }).filter(Boolean);

      await Promise.all(defaultEquipamentParams);

      foundEquipamentsParams = await prisma.equipamentParameters.findMany({
        where: {
          equipamentId: equipament.id,
        }
      });

      const equipamentParams = foundEquipamentsParams.map(param => {
        return {
          [param.name]: returnValueConverted(param.value, param.type as any),
        }
      }).reduce((previousValue, current) => {
        return {
          ...previousValue,
          ...current
        }
      }, {});
  
      return response.status(201).json({
        equipament: equipamentUpdated,
        params: equipamentParams,
      });
    } catch (error) {
      console.log({error})
      return response.status(403).json({error: error.message});
    }
  }
}
