import * as Sentry from '@sentry/node'
import cuid from 'cuid'
import fetch from 'cross-fetch'
import { Queue, Worker } from 'bullmq'
import { getRepository } from 'typeorm'
import { Security } from '../modules/security/security.entity'
import { REDIS_PORT, REDIS_URL, REDIS_PASS, EXCHANGE_URL, FINNHUB_KEY } from './config'

// exchanges and codes https://docs.google.com/spreadsheets/d/1I3pBxjfXB056-g_JYf_6o3Rns3BV2kMGG1nCatb91ls/edit#gid=0
// {"currency":"CAD","description":"IA CLARINGTON GLOBAL BOND FU","displaySymbol":"IGLB.TO","figi":"BBG00M93B6B7","mic":"XTSE","symbol":"IGLB.TO","type":"ETP"}

interface Asset {
  currency: string
  description: string
  displaySymbol: string
  figi: string
  mic: string
  symbol: string
  type: string
}

const syncQueue = new Queue('Sync', {
  connection: {
    host: REDIS_URL,
    port: +REDIS_PORT,
    ...(REDIS_PASS && { password: REDIS_PASS }),
    ...(REDIS_PASS && { tls: { host: REDIS_URL } }),
  },
})

export async function getWorkers() {
  const workers = await syncQueue.getWorkers()
  console.log(workers)
}

export const syncWorker = new Worker(
  'Sync',
  async (job) => {
    const response = await fetch(`${EXCHANGE_URL}=${job.data.exchange}&token=${FINNHUB_KEY}`, {
      method: 'GET',
    })
    const symbolList = await response.json()
    const repository = getRepository(Security)
    const entities: Array<Partial<Security & { symbolid: string }>> = []

    symbolList.map(async (item: Asset) => {
      const data = await repository.findOne({ displaySymbol: item.displaySymbol })
      if (!data) entities.push({ ...item, symbolId: cuid(), simple: item.displaySymbol.replace('.TO', '') })
    })
    repository.save(entities)
  },
  {
    connection: {
      host: REDIS_URL,
      port: +REDIS_PORT,
      ...(REDIS_PASS && { password: REDIS_PASS }),
      ...(REDIS_PASS && { tls: { host: REDIS_URL } }),
    },
    // concurrency: 2,
  },
)

syncWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
})

syncWorker.on('failed', (job, err) => {
  Sentry.captureException(err)
  console.log(`${job.id} has failed with ${err.message}`)
})

syncWorker.on('error', (err) => {
  Sentry.captureException(err)
})

export async function addJobs() {
  console.log('jobs ready')
  // await syncQueue.add('updateCASymbols', { exchange: 'TO' }, { repeat: { cron: '0 0 * * SUN' } })
  // await syncQueue.add('updateUSSymbols', { exchange: 'US' }, { repeat: { cron: '0 0 * * SAT' } })
}
