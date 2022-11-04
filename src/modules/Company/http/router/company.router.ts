import Route from '@ioc:Adonis/Core/Route';

import { ListCompanyController } from '../../useCases/ListCompany/controller';

Route.group(() => {
  Route.get('list', new ListCompanyController().many).as('list-many-company').middleware('auth');
}).prefix('api/company/');

