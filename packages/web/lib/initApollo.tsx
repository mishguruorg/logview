import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

import { getAuth0 } from './auth0'

let apolloClient = null

const authLink = setContext(async (request, previousContext) => {
  let token = null
  try {
    const auth0 = getAuth0()
    if (auth0.isAuthenticated()) {
      token = await auth0.getTokenSilently()
    }
  } catch (error) {
    console.error(error)
  }

  return {
    headers: {
      ...previousContext.headers,
      authorization: token && `Bearer ${token}`
    }
  }
})

function create (initialState) {
  const isBrowser = typeof window !== 'undefined'

  return new ApolloClient({
    connectToDevTools: isBrowser,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !isBrowser,
    link: authLink.concat(new HttpLink({
      uri: 'http://localhost:4000/',
      credentials: 'same-origin',
      fetch: !isBrowser && fetch,
    })),
    cache: new InMemoryCache().restore(initialState)
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
