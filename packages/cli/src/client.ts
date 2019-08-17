import WebSocket from 'ws'
import fetch from 'isomorphic-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split, concat } from 'apollo-link'
import { onError } from 'apollo-link-error'

import { ServerConfig } from './types'
import getAuthToken from './auth'

const createClient = async (config: ServerConfig) => {
  const token = await getAuthToken(config.auth)

  const httpLink = new HttpLink({
    fetch,
    uri: config.http,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const wsLink = new WebSocketLink({
    uri: config.ws,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: `Bearer ${token}`,
      },
    },
    webSocketImpl: WebSocket,
  })

  // switch between HTTP and WebSocket links depending on operation type
  const wsAndHttpLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as {
        kind: string,
        operation: string,
      }
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  const link = concat(errorLink, wsAndHttpLink)

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  return client
}

export default createClient
