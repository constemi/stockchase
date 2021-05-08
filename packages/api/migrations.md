# Migrations

## First Run
- yarn db:create

## Subsequent Runs
yarn db:generate migrationNameWithoutQuotes (creates a migration)
yarn db:migrate (runs the migration)

### Downgrades
yarn db:rollback