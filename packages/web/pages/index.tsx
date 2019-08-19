import { useState } from 'react'

import { useAuth0 } from '../lib/auth0'

import LoginForm from '../components/login-form'
import App from '../components/app'

const Index = () => {
  const { isAuthenticated, loading } = useAuth0()

  if (loading || isAuthenticated === false) {
    return (
      <LoginForm loading={loading} />
    )
  }

  return (
    <App />
  )
}

export default Index
