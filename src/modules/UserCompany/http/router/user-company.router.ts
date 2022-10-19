import Route from '@ioc:Adonis/Core/Route';

import { CreateUserCompanyController } from '../../useCases/CreateUserCompany/controller';
import { ListUserFromCompanyController } from '../../useCases/ListUsersFromCompany/controller';
import { RemoveUserCompanyController } from '../../useCases/RemoveUserCompany/controller';

Route.group(() => {
  Route.post('create', new CreateUserCompanyController().handle).as('create-user-company').middleware('auth');

  Route.delete('remove', new RemoveUserCompanyController().handle).as('remove-user-company').middleware('auth');

  Route.get('list', new ListUserFromCompanyController().handle).as('list-user-permission').middleware('auth');
}).prefix('api/user-company/');

