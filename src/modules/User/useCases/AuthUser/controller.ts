import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { jwtConfig } from '../../../../../config/jwt';
import { sign } from 'jsonwebtoken';
import { findAllUserInfoByEmail } from '../../repositories/user-repositories';
import bcrypt from 'bcrypt';
import { userInstanceToInstance } from 'src/shared/utils/instanceToInstance';

export class AuthUserController {
  public async login({ request, response }: HttpContextContract) {
    try {
      const password = await request.input('password');
      const email = await request.input('email')

      const user = await findAllUserInfoByEmail(email);

      if(!user) {
        throw new Error("User not exist");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password)
  
      if(!isPasswordValid) {
        throw new Error("Password or email not valid");
      }

      const token = sign({}, jwtConfig.secret, {
        subject: user.id,
        expiresIn: '1d',
      });

      return {
        token,
        user: userInstanceToInstance(user),
      }
    } catch(error) {
      return response
        .status(400)
        .send({
          error: error.message
        })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}