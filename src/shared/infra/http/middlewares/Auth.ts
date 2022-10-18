import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { verify } from 'jsonwebtoken'
import { jwtConfig } from '../../../../../config/jwt';
/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = '/login'

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return true
      }
    }
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo,
    )
  }
   public async handle(
    { request }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    const authHeader = request.headers().authorization;

    if (!authHeader) {
      throw new Error('JWT token is missing');
    }
  
    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, jwtConfig.secret);
  
      const { sub } = decoded as any;
  
      request.user = {
        id: sub, 
      };

      return next();
    } catch {
      throw new Error('Invalid JWT token');
    }
  }
}
