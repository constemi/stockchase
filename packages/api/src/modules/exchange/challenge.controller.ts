import * as Sentry from '@sentry/node'
import { getRepository } from 'typeorm'
import { Response } from 'express'
import { User } from '../user/user.entity'
import { Get, Res, Controller, HttpCode, Render, QueryParam } from 'routing-controllers'
import { createAuthToken } from '../../lib/jwt'
import { decryptOtpToken } from '../../lib/otp'
import { SESSION_TOKEN, WEB_ORIGIN, API_ORIGIN } from '../../lib/config'

@Controller()
export class AuthController {
  /**
   * Returns a redirect
   * Request https://api.fqdn/v1/auth/callback/challenge?token=${token}
   * Success - 302 https://fqdn with cookie
   * Error - 302 https://api.fqdn/v1/auth/error?error=${reason} (Verification, Expiration)
   *
   * @param {string} token The token to decode.
   * @return {Response} Express response
   */
  @Get('/auth/callback/challenge')
  async callback(
    @QueryParam('token') token: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const payload = decryptOtpToken(token)
      const user = await getRepository(User).findOne({ email: payload?.email })
      if (user) {
        const authToken = createAuthToken({ id: user.id })
        res.cookie(SESSION_TOKEN, authToken, { httpOnly: false, secure: true, domain: 'localhost' })
        res.redirect(WEB_ORIGIN)
        return res
      }
    } catch (error) {
      Sentry.captureException(error)
    }
    res.redirect(API_ORIGIN + '/v1/auth/error?' + new URLSearchParams({ error: 'Verification' }))
    return res
  }

  @Get('/auth/error')
  @HttpCode(403)
  @Render('error')
  async error(): Promise<Record<string, any>> {
    const templateError = {
      reason: 'The sign in link is no longer valid.',
      extra: 'It may have been used already or it may have expired.',
    }
    return templateError
  }
}
