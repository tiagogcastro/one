import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from 'src/shared/infra/prisma/client';

export class ListCompanyController {
  public async many({ response }: HttpContextContract) {

    try {
      const companies = await prisma.company.findMany();

      return response.status(201).json({
        companies,
      });
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
