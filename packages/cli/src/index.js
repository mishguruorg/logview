import WebSocket from 'ws';
import fetch from 'node-fetch'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  fetch,
  uri: 'http://localhost:4000',
  headers: {
    authorization: 'undergo-unblock-wobbling-undercoat-snowbound-swoosh-fame'
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true
  },
  webSocketImpl: WebSocket
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const singleQuery = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        filter(input: { last: 5 }) {
          results {
            id
          }
        }
      }
    `
  })

  console.dir(data)
}

const subscribe = async () => {
  const stream = await client.subscribe({
    query: gql`
      subscription {
        filter(input: { last: 5 }) {
          results {
            id
            createdAt
            name
            info
          }
        }
      }
    `
  })

  stream.subscribe({
    next(res) {
      const { results } = res.data.filter
      for (const log of results.reverse()) {
        const { id, name, info, createdAt } = log
        console.log(`${id} [${name}] ${info.slice(0, 100)} (${createdAt})`)
      }
    },
    error (error) {
      console.error(error)
    }
  })
}

subscribe()
