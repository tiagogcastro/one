import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { jwtConfig } from '../../../../../config/jwt';
import { sign } from 'jsonwebtoken';
import { findByEmail, findById } from '../../repositories/user-repositories';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { findUserRoleByRoleIdAndUserId } from '../../repositories/user-role-repositories';
import { prisma } from 'src/shared/infra/prisma/client';

export class AdminAuthViewAsClientController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    try {
      const email = await request.input('email');
      
      if(!email) {
        throw new Error('Please enter email');
      }

      const user = await findByEmail(email);

      if(!user) {
        throw new Error("User not exist");
      }
      
      const userLogged = await findById(userLoggedId);

      if (!userLogged) { 
        throw new Error('User not found');
      }

      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      const userLoggedIsAdminRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);
      
      if (!userLoggedIsAdminRole) { 
        throw new Error("You cannot log into a customer's account");
      }

      const userRoles = await prisma.userRole.findMany({
        where: {
          userId: user.id,
        },
        select: {
          role: true,
          created_at: true,
          updated_at: true,
        }
      });

      const userPermissions = await prisma.userPermission.findMany({
        where: {
          userId: user.id,
        },
        select: {
          permission: true,
          created_at: true,
          updated_at: true,
        }
      });

      const token = sign({}, jwtConfig.secret, {
        subject: user.id,
        expiresIn: '1d',
      });

      return {
        token,
        user: {
          ...user,
          userRoles,
          userPermissions,
        },
      }
    } catch(error) {
      return response
        .status(400)
        .send({
          error: error.message
        })
    }
  }
}