import React from 'react'

import { useAuth0 } from '../lib/auth0'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  if (isAuthenticated) {
    return (
      <div>
        <button onClick={() => logout({
          returnTo: 'http://localhost:3000/'
        })}>Log out</button>

        <p>{user.name}</p>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() =>
          loginWithRedirect({})
        }
      >
        Log in
      </button>
    </div>
  )
}

export default NavBar
