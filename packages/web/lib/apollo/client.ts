import * as React from 'react'
// import { WebSocketLink } from '@apollo/client/link/ws'
// import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GRAPHQL_API_URL, SESSION_TOKEN } from 'lib/config'
import { parseCookies } from 'lib/helpers/utils'

type Callback = () => string
type Options = {
  getToken: Callback
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const _httpLink = createHttpLink({ uri: GRAPHQL_API_URL })

// const wsLink = (token: string) => {
//   return process.browser
//     ? new WebSocketLink({
//         uri: SUBSCRIPTIONS_URL,
//         options: {
//           reconnect: true,
//           connectionParams: {
//             headers: {
//               Authorization: token ? `Bearer ${token}` : '',
//             },
//           },
//         },
//       })
//     : null
// }

function createApolloClient(initialState: null | Record<string, any>, options: Options) {
  const { getToken } = options
  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const httpLink = authLink.concat(_httpLink)

  // Split queries where subscriptions are transported via WebSocket and the rest
  // through http link
  // const splitLink = process.browser
  //   ? split(
  //       ({ query }) => {
  //         const definition = getMainDefinition(query)
  //         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  //       },
  //       wsLink(getToken()) as WebSocketLink,
  //       httpLink,
  //     )
  //   : httpLink

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    ssrForceFetchDelay: 100,
    link: httpLink,
    defaultOptions: {
      mutate: { errorPolicy: 'all' },
      query: { errorPolicy: 'all' },
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
  if (typeof window === 'undefined') return _apolloClient
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
