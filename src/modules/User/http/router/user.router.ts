import Route from '@ioc:Adonis/Core/Route';
import { AdminAuthViewAsClientController } from '../../useCases/AdminViewAsClient/controller';
import { AuthUserController } from '../../useCases/AuthUser/controller';
import { CreateUserController } from '../../useCases/CreateUser/controller';
import { EmailVerificationListingController } from '../../useCases/EmailVerification/controller';
import { RemoveUserController } from '../../useCases/RemoveUser/controller';
import { RemoveUserRoleController } from '../../useCases/RemoveUserRole/controller';
import { UpdateUserController } from '../../useCases/UpdateUser/controller';
import { UserListingController } from '../../useCases/UserListing/controller';

Route.group(() => {
  Route.post('register', new CreateUserController().handle).as('register').middleware('auth');

  Route.post('login', new AuthUserController().login).as('login');
  Route.post('logout', new AuthUserController().logout).as('logout').middleware('auth');

  Route.delete('delete', new RemoveUserController().handle).as('delete').middleware('auth');
  Route.put('update', new UpdateUserController().user).as('update').middleware('auth');

  Route.get('list-unique', new UserListingController().show).as('list-unique-user').middleware('auth');
  Route.get('list', new UserListingController().index).as('list-users').middleware('auth');

  Route.group(() => {
    Route.post('view-as-client', new AdminAuthViewAsClientController().handle).as('view-as-client').middleware('auth');
  }).prefix('/admin/')

  Route.group(() => {
    Route.delete('remove', new RemoveUserRoleController().handle).as('remove-user-role').middleware('auth');
  }).prefix('/roles/')

  Route.get('/verify-email/:email', new EmailVerificationListingController().handle).as('verifyEmail');
}).prefix('api/users/');