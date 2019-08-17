import React from 'react'

import { useAuth0 } from '../lib/auth0'

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>
        Log in
      </button>
    </div>
  )
}

export default LoginForm
