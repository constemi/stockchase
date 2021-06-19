import { URLSafeTimedSerializer } from '@constemi/itsdangerjs'
import { OTP_KEY, OTP_SALT } from '../lib/config'

type Payload = Record<string, any>

export const createOtpToken = (payload: Payload): string => {
  try {
    const serializer = URLSafeTimedSerializer(OTP_KEY, { salt: OTP_SALT, digestMethod: 'sha512' })
    const token = serializer.dumps(payload)
    return token
  } catch (error) {
    // Oops
    throw error
  }
}

export const decryptOtpToken = (token: string, maxAge: number = 60 * 60): { email: string } | undefined => {
  try {
    const serializer = URLSafeTimedSerializer(OTP_KEY, { salt: OTP_SALT, digestMethod: 'sha512' })
    const payload = serializer.loads(token, maxAge)
    return payload
  } catch (error) {
    // Oops
    throw error
  }
}
