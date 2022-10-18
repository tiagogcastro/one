import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { startPrismaDB } from '../infra/http/start/prismadb';


export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
        
    startPrismaDB();
  }

  public async ready() {

  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
