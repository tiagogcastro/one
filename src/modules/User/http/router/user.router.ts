import Route from '@ioc:Adonis/Core/Route';

import { AuthUserController } from '../../useCases/AuthUser/controller';
import { CreateUserController } from '../../useCases/CreateUser/controller';
import { EmailVerificationListingController } from '../../useCases/EmailVerification/controller';

Route.group(() => {
  Route.post('register', new CreateUserController().handle).as('register').middleware('auth');

  Route.post('login', new AuthUserController().login).as('login');
  Route.post('logout', new AuthUserController().logout).as('logout').middleware('auth');

  Route.get('/verify-email/:email', new EmailVerificationListingController().handle).as('verifyEmail');
}).prefix('api/users/');