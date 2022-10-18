import Route from '@ioc:Adonis/Core/Route';

import { CreateRoleController } from '../../useCases/CreateRole/controller';

Route.group(() => {
  Route.post('create', new CreateRoleController().handle).as('create-role').middleware('auth');
}).prefix('api/roles/');

