import { Service } from 'typedi'
import * as Sentry from '@sentry/node'

import { FULL_WEB_URL } from '../../lib/config'
import { User } from './user.entity'
import { Mailer } from '../../lib/mailer'

@Service()
export class UserMailer extends Mailer {
  sendOtpRegisterLink(user: Partial<User>, token: string) {
    try {
      if (!user.email) return
      this.send({
        templateId: 'todo',
        to: user.email,
        variables: {
          link: `${FULL_WEB_URL}/v1/auth/callback/challenge?` + new URLSearchParams({ token }),
        },
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  sendResetPasswordLink(user: User, token: string) {
    try {
      if (!user.email) return
      this.send({
        templateId: 'd-efeeebd841dd48768ab7f4ac9907d2f1',
        to: user.email,
        variables: {
          link: `${FULL_WEB_URL}/reset-password/${token}`,
        },
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  sendPasswordChanged(user: User) {
    try {
      if (!user.email) return
      this.send({
        templateId: 'd-685ac10b1fdf47f39bbb0cca8e825f3b',
        to: user.email,
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }
}
