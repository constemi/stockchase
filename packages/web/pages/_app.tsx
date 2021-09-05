import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { useApollo } from 'lib/apollo/client'
import { theme } from 'lib/theme'
import { IS_PRODUCTION, SENTRY_DSN } from 'lib/config'

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  enabled: IS_PRODUCTION,
  tracesSampleRate: 1.0,
})

export default function FullstackBoilerplateApp(props: AppProps<any>) {
  const { Component, pageProps } = props

  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link href="/index.css" rel="stylesheet" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </>
  )
}
