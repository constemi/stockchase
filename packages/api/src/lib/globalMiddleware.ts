import { MiddlewareFn, ArgumentValidationError } from "type-graphql"
import { UserInputError, AuthenticationError } from "apollo-server-express"
import chalk from "chalk"
import * as Sentry from "@sentry/node"

import { IS_PRODUCTION } from "./config"

export const ErrorInterceptor: MiddlewareFn = async ({}, next) => {
  try {
    return await next()
  } catch (err) {
    if (
      !(err instanceof ArgumentValidationError) &&
      !(err instanceof UserInputError) &&
      !(err instanceof AuthenticationError)
    ) {
      if (IS_PRODUCTION) {
        Sentry.captureException(err)
      } else {
        console.log(`[${chalk.red("ERROR")}] `, err)
      }
    }
    throw err
  }
}
