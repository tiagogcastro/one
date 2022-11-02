import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { prisma } from 'src/shared/infra/prisma/client'
import { userInstanceToInstance } from 'src/shared/utils/instanceToInstance';
import { findAllUserInfoById } from '../../repositories/user-repositories';

export class UserListingController {
  public async index() {
    const users = await prisma.user.findMany({
      include: {
        Company: true,
        UserCompany: true,
        UserPermission: {
          select: {
            id: true,
            permission: true,
          }
        },
        UserRole: {
          select: {
            id: true,
            role: true
          }
        },
      }
    })
    return userInstanceToInstance(users)
  }
  public async show({ request, response }: HttpContextContract) {
    try {
      const user_id_params = request.qs().user_id as string;

      const user = await findAllUserInfoById(user_id_params || request.user.id);

      if(!user) {
        throw new Error('User not found');
      }

      return userInstanceToInstance(user);
    } catch (error) {
      return response
        .status(400)
        .send({
          error: error.message
        })
    }
  }
}