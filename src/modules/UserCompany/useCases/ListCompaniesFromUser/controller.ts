import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from 'src/shared/infra/prisma/client';

export class ListCompanyFromUserController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const user_id = request.qs().user_id;

    try {
      const companies = await prisma.userCompany.findMany({
        where: {
          userId: user_id || userLoggedId
        },
        select: {
          id: true,
          company: true,
        }
      });
      return response.status(201).json(companies);
    } catch (error) {
      return response.status(403).json({error: error.message});
    }
  }
}
