import Route from '@ioc:Adonis/Core/Route'

Route.resource('api/users', 'Users/UsersController')

Route.group(() => {
  // registration and login logic
  Route.post('register', 'Users/AuthController.register').as('register')
  Route.post('login', 'Users/AuthController.login').as('login')
  Route.post('logout', 'Users/AuthController.logout').as('logout')
  Route.get('/verify-email/:email', 'users/EmailVerificationsController.confirm').as('verifyEmail')
}).prefix('api/users/')
