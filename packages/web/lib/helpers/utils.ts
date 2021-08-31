import { IncomingMessage } from 'http'
import cookie from 'cookie'
import Router from 'next/router'
import { GetServerSidePropsContext } from 'next'

import { ParsedUrlQuery } from 'querystring'

export const isBrowser = typeof window !== 'undefined'

export const get = (
  object: {
    [key: string]: any
  },
  parser: string, // 'deeply.nested[0].name'
) => {
  parser = parser.replace(/\[(\w+)\]/g, '.$1')
  parser = parser.replace(/^\./, '')
  const a = parser.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (typeof object === 'object' && k in object) {
      object = object[k]
    } else {
      return
    }
  }
  return object
}

export const humanize = (str: string) => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase()
    })
}

export const redirect = (
  context: GetServerSidePropsContext<ParsedUrlQuery> | undefined,
  as: string,
  href?: string,
  code?: number,
): void => {
  if (context?.res) {
    context.res.writeHead(code || 303, { Location: as })
    context.res.end()
  } else {
    Router.replace(href || as, as)
  }
}

export function parseCookies(req?: IncomingMessage, options = {}): Record<string, string> {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export function groupBy<T>(arr: T[], criteria: (item: T) => string | string): Record<string, T[]> {
  return arr.reduce((obj: any, item: any) => {
    const key = typeof criteria === 'function' ? criteria(item) : item[criteria]
    if (!obj.hasOwnProperty(key)) {
      obj[key] = []
    }
    obj[key].push(item)
    return obj
  }, {})
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export function camelToHuman(name?: string | null): string {
  if (!name) return ''
  const words = name.match(/[A-Za-z][a-z]*/g) || []
  return words.map(capitalize).join(' ')
}

export function reorder<R>(list: R[], startIndex: number, endIndex: number): R[] {
  const result = list
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function isMobile() {
  if (!isBrowser) return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
}
