import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import { findByEmail } from '../../repositories/user-repositories';

export class EmailVerificationListingController {
  public async handle({ response, request, params }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await findByEmail(params.email);

      if(!user) {
        return;
      }

      if (!user?.is_activated) {
        user.email_verified_at = String(DateTime.local());
        user.is_activated = true;
        return response.status(202).send({ message: 'Account verified and activated' })
      } else {
        return response.status(409).send({ message: 'Account was already verified' })
      }
    } else {
      return response.status(403).send({ error: { message: 'Invalid token' } })
    }
  }
}