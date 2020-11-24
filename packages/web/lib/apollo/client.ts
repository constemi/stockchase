import * as React from "react"
import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { API_URL, SESSION_TOKEN } from "lib/config"
import { parseCookies } from "lib/helpers/utils"

type Callback = () => string
type Options = {
  getToken: Callback
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const httpLink = createHttpLink({ uri: API_URL })

function createApolloClient(initialState: null | Record<string, any>, options: Options) {
  const { getToken } = options
  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    ssrForceFetchDelay: 100,
    link: authLink.concat(httpLink),
    defaultOptions: {
      mutate: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
    },
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export function initializeApollo(initialState: null | Record<string, any>, options: Options) {
  const _apolloClient = apolloClient ?? createApolloClient(initialState, options)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = {
      ...initialState,
      ...existingCache,
      ROOT_QUERY: {
        ...initialState.ROOT_QUERY,
        ...existingCache.ROOT_QUERY,
      },
    }
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any = null) {
  const store = React.useMemo(
    () => initializeApollo(initialState, { getToken: () => parseCookies()[SESSION_TOKEN] }),
    [initialState],
  )
  return store
}
