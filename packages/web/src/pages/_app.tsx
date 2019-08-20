import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

import { Auth0Provider } from '../lib/auth0';
import withApolloClient from '../lib/withApolloClient'

type Props = {
  apolloClient: ApolloClient<any>
}

class MyApp extends App<Props> {
  render () {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <Auth0Provider>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Auth0Provider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
