import 'reflect-metadata'
import 'dotenv/config'
import Container, { Service } from 'typedi'
import { createDbConnection } from './db'

@Service()
class Workers {
  async work() {
    await createDbConnection()
  }
}

Container.get(Workers)
  .work()
  .then(() => console.log('Workers running 🏃'))
  .catch((err) => console.log(err.message))
