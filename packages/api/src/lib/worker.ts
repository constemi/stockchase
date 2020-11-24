import BQueue, { Queue, JobOptions } from "bull"
import * as Sentry from "@sentry/node"

import { REDIS_URL } from "./config"

type JobPayload = { name: string; data: any }
export class Worker<T extends JobPayload> {
  protected key: string
  protected queue: Queue
  constructor(key: string) {
    this.queue = new BQueue(key, REDIS_URL)
  }

  protected async runJob(processor: (job: any) => Promise<any>) {
    this.queue.process(async (job) => {
      try {
        console.info("Processing job:", job.data)
        await processor(job.data)
        console.info("Job complete:", job.data.name)
      } catch (error) {
        Sentry.captureException(error)
        console.log(error)
        console.info("JOB NAME:", job.data.name)
        console.info("JOB DATA:", job.data.data)
      }
    })
  }

  async addJob(job: T, opts?: JobOptions) {
    this.queue.add({ name: job.name, data: job.data }, opts)
  }
}
