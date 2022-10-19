import Route from '@ioc:Adonis/Core/Route';

import { CreateUserPermissionController } from '../../useCases/CreateUserPermission/controller';
import { RemoveUserPermissionController } from '../../useCases/RemoveUserPermission/controller';

Route.group(() => {
  Route.post('create', new CreateUserPermissionController().handle).as('create-user-permission').middleware('auth');

  Route.delete('remove', new RemoveUserPermissionController().handle).as('remove-user-permission').middleware('auth');
}).prefix('api/user-permission/');

