import { ConnectionOptions } from 'typeorm'

const ormconfig: Array<ConnectionOptions & { seeds?: string[]; factories?: string[] }> = [
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'fullstack-boilerplate',
    synchronize: false,
    logging: true,
    cache: true,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    cli: { migrationsDir: 'src/db/migrations' },
  },
  {
    name: 'worker',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'fullstack-boilerplate',
    synchronize: false,
    logging: true,
    cache: true,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
    seeds: ['src/db/seeds/**/*{.ts,.js}'],
    factories: ['src/db/factories/**/*{.ts,.js}'],
    cli: { migrationsDir: 'src/db/migrations' },
  },
  {
    name: 'production',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    synchronize: false,
    logging: true,
    cache: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: ['dist/modules/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: { migrationsDir: 'dist/db/migrations' },
  },
]

export default ormconfig
