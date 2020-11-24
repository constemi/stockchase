import { getConnectionOptions, createConnection, Connection } from "typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as Sentry from "@sentry/node"
import { NODE_ENV, DATABASE_URL, IS_PRODUCTION } from "../lib/config"

interface Props {
  runMigrations?: boolean
}

export const createDbConnection = async (args?: Props): Promise<Connection> => {
  // Create DB connection
  const options = (await getConnectionOptions(NODE_ENV)) as PostgresConnectionOptions

  const connection = await createConnection({
    ...options,
    name: "default",
    url: DATABASE_URL,
  })

  // Run migrations in production
  if (args && args.runMigrations && IS_PRODUCTION)
    await connection.runMigrations().catch((error) => {
      Sentry.captureException(error)
    })

  return connection
}
