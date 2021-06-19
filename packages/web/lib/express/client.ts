// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import { parseCookies } from 'lib/helpers/utils'
import { SESSION_TOKEN } from '../config'

interface Config {
  method?: string
  headers?: Record<string, any>
  credentials?: RequestCredentials | undefined
  body?: BodyInit
  inputData?: Record<string, any>
}

export async function client(endpoint: string, { inputData, ...customConfig }: Config = {}) {
  const token = parseCookies()[SESSION_TOKEN]
  const headers: Record<string, any> = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config: Config = {
    method: inputData ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (inputData) {
    config.body = JSON.stringify(inputData)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint: string, body: BodyInit, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}
