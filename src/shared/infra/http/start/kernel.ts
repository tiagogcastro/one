import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({
  auth: () => import('src/shared/infra/http/middlewares/Auth'),
})
