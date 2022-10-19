import Route from '@ioc:Adonis/Core/Route';

import { CreatePermissionController } from '../../useCases/CreatePermission/controller';
import { DeletePermissionController } from '../../useCases/DeletePermission/controller';

Route.group(() => {
  Route.post('create', new CreatePermissionController().handle).as('create-permission').middleware('auth');

  Route.delete('delete', new DeletePermissionController().handle).as('delete-permission').middleware('auth');
}).prefix('api/permission/');

