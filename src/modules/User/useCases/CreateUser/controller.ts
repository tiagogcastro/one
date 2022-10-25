import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { CreateUserService } from './service';

export class CreateUserController {
  public async handle({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;

    const { name, lastname, email, password, username, company } = request.all();

    try {
      const data = {
        name, lastname, email, password, username, company
      }
  
      const createUserService = new CreateUserService();
      const {user, company: companyData} = await createUserService.execute(data, userLoggedId);
  
      return response
        .status(201)
        .send({ 
          success: 'Registration successful, check your email inbox for a verification email',
          user,
          company: companyData
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