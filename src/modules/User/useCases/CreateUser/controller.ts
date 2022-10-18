import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Event from '@ioc:Adonis/Core/Event';

import { CreateUserService } from './service';

export class CreateUserController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { name, lastname, email, password, username } = request.all();

    try {
      const data = {
        name, lastname, email, password, username
      }
  
      const createUserService = new CreateUserService();
      const user = await createUserService.execute(data, userLoggedId);
  
      Event.emit('new:user', {
        newUser: user,
      })
  
      return response
        .status(201)
        .send({ 
          success: 'Registration successful, check your email inbox for a verification email',
          user,
        });
    } catch (error) {
      return response
        .status(403)
        .send({ 
          error: error.message
        });
    }
  }
}