interface SerializerArgs {
  salt: string
  digestMethod: string
}

type Payload = Record<string, any>

declare module '@constemi/itsdangerjs' {
  import * as ItsDangerjs from '@constemi/itsdangerjs'

  export declare class URLSafeTimedSerializer {
    constructor(secretKey: string, { salt, digestMethod }: SerializerArgs)

    dumps(payload: Payload): string

    loads(token: string, maxAge: number): Payload
  }
  export default ItsDangerjs
}
