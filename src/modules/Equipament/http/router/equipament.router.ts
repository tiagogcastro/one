import Route from '@ioc:Adonis/Core/Route';

import { CreateEquipamentController } from '../../useCases/CreateEquipament/controller';
import { DeleteEquipamentController } from '../../useCases/DeleteEquipament/controller';
import { ListEquipamentsController } from '../../useCases/ListEquipaments/controller';
import { UpdateEquipamentController } from '../../useCases/UpdateEquipament/controller';
import { ListUniqueEquipamentController } from '../../useCases/ListUniqueEquipament/controller';

Route.group(() => {
  Route.post('create', new CreateEquipamentController().handle).as('create-equipament').middleware('auth');
  Route.get('list', new ListEquipamentsController().handle).as('list-equipament').middleware('auth');
  Route.get('list-unique', new ListUniqueEquipamentController().handle).as('list-unique-equipament').middleware('auth');
  Route.put('update', new UpdateEquipamentController().handle).as('update-equipament').middleware('auth');

  Route.delete('delete', new DeleteEquipamentController().handle).as('delete-equipament').middleware('auth');
}).prefix('api/equipament/');

