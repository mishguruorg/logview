import WebSocket from 'ws'
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split, concat } from 'apollo-link'
import { onError } from 'apollo-link-error'

const createClient = (config) => {
  const httpLink = new HttpLink({
    fetch,
    uri: config.http,
    headers: {
      authorization: config.secret
    }
  })

  const wsLink = new WebSocketLink({
    uri: config.ws,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: config.secret
      }
    },
    webSocketImpl: WebSocket
  })

  // switch between HTTP and WebSocket links depending on operation type
  const wsAndHttpLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const link = concat(errorLink, wsAndHttpLink)

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  })

  return client
}

export default createClient
