import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

let GLOBAL_AUTH0 = null
export const getAuth0 = () => GLOBAL_AUTH0

export const Auth0Context = React.createContext(undefined)

export const useAuth0 = () => useContext(Auth0Context)

const onRedirectCallback = (appState: Record<string, string>) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

export const Auth0Provider = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({
        redirect_uri: 'http://localhost:3000/',
        domain: 'mishguruadmin.auth0.com',
        client_id: 'lj6liY2gXGfmrKijjPNX2rVTtGsXh6t3',
        audience: 'https://logview.mish.guru/'
      })
      setAuth0(auth0FromHook)
      GLOBAL_AUTH0 = auth0FromHook

      if (window.location.search.includes("code=")) {
        try {
          const { appState } = await auth0FromHook.handleRedirectCallback()
          onRedirectCallback(appState)
        } catch (error) {
          console.error(error)
        }
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()
      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }

    initAuth0().catch(console.error)
  }, [])

  const handleRedirectCallback = async () => {
    try {
      setLoading(true)
      await auth0Client.handleRedirectCallback()
      const user = await auth0Client.getUser()
      setUser(user)
      setIsAuthenticated(true)
    } 
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}

