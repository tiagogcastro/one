/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  DATABASE_URL: Env.schema.string(),
  POSTGRES_HOST: Env.schema.string({ format: 'host' }),
  POSTGRES_PORT: Env.schema.number(),
  POSTGRES_USER: Env.schema.string(),
  POSTGRES_PASSWORD: Env.schema.string(),
  POSTGRES_DATABASE: Env.schema.string(),

  NOU_ADMIN_EMAIL: Env.schema.string(),
  NOU_ADMIN_PASSWORD: Env.schema.string(),
  NOU_ADMIN_NAME: Env.schema.string(),
  NOU_ADMIN_LASTNAME: Env.schema.string(),
  NOU_ADMIN_USERNAME: Env.schema.string(),
})
