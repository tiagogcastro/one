import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CompanyArea, Equipament } from '@prisma/client';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findById } from 'src/modules/User/repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from 'src/modules/User/repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class CreateEquipamentController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    let equipament: Equipament = {} as Equipament;
    let companyArea: CompanyArea | null = {} as CompanyArea;

    try {
      const { company_id, company_area, equipament_name, params } = request.all();

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

      if(!equipament_name) {
        throw new Error('Please enter equipament_name');
      }

      if(!params) {
        throw new Error('Please enter params');
      }

      const defaultParamsRequired = ["temperature", "temperature_setpoint", "volume", "recipe_name", "batch", "output_status", "connected", "process_status"];
      
      const hasRequiredDefautls = defaultParamsRequired.map(prop => {
        if(!params.hasOwnProperty(prop)) {
          return `Please enter params.${prop}`;
        }

        if(!params[prop]) {
          return `Please enter params.${prop} value`;
        }
      }).filter(Boolean);
      
      if(hasRequiredDefautls.length > 0) {
        return {
          error: hasRequiredDefautls
        }
      }

      if(!company_area) {
        throw new Error('Please enter company_area');
      }

      if(company_area.id && company_area.name || !company_area.id && !company_area.name) {
        throw new Error('Please enter company_area.id or company_area.name');
      }

      if(company_area.name && !company_area.id) {
        companyArea = await prisma.companyArea.create({
          data: {
            name: company_area.name,
            companyId: company_id,
          }
        });
      }

      if(company_area.id && !company_area.name) {
        companyArea = await prisma.companyArea.findUnique({
          where: {
            id: company_area.id,
          }
        });

        if(!companyArea) {
          throw new Error('Company area not found');
        }
      }

      if(companyArea) {
        equipament = await prisma.equipament.create({
          data: {
            companyId: company_id,
            companyAreaId: companyArea.id,
            name: equipament_name,
          },
          include: {
            company: true,
            companyArea: true,
          }
        });
      }

      if(equipament) {
        const equipamentParametersData = Object.entries(params).map(([key, value]: [string, string]) => {
          return {
            name: key,
            value: String(value),
            equipamentId: equipament?.id,
            type: typeof value
          }
        });

        await prisma.equipamentParameters.createMany({
          data: equipamentParametersData,
        });
      }

      return response.status(201).json({
        equipament: {
          ...equipament,
          params 
        },
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
