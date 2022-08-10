// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = await User.all()
    return users
  }
  public async show({ params }) {
    const users = await User.findOrFail(params.id)
    return users
  }
}
