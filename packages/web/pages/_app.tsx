import * as React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import { MeProvider } from "components/providers/MeProvider"
import { useApollo } from "lib/apollo/client"
import { theme } from "lib/theme"
import { IS_PRODUCTION, SENTRY_DSN } from "lib/config"

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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link href="/index.css" rel="stylesheet" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <MeProvider>
            <Component {...pageProps} />
          </MeProvider>
        </ApolloProvider>
      </ChakraProvider>
    </>
  )
}
