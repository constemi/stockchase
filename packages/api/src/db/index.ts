import { getConnectionOptions, createConnection, Connection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import * as Sentry from '@sentry/node'
import { NODE_ENV, DATABASE_URL, IS_PRODUCTION } from '../lib/config'

interface Props {
  runMigrations?: boolean
  connectionName?: string
}

export const createDbConnection = async (args?: Props): Promise<Connection> => {
  // Create DB connection
  // const connectionName = args?.connectionName || 'default'
  const options = (await getConnectionOptions(NODE_ENV)) as PostgresConnectionOptions
  console.log(options)
  const connection = await createConnection({
    ...options,
    // name: connectionName,
    url: DATABASE_URL,
  })

  // Run migrations in production
  if (args && args.runMigrations && IS_PRODUCTION)
    await connection.runMigrations().catch((error) => {
      Sentry.captureException(error)
    })

  return connection
}
