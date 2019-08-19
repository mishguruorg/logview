import { useAuth0 } from '../lib/auth0'

import LoadingScreen from '../components/loading-screen'
import LoginForm from '../components/login-form'
import App from '../components/app'

const Index = () => {
  const { isAuthenticated, loading: loadingAuth } = useAuth0()

  if (loadingAuth) {
    return (
      <LoadingScreen />
    )
  }

  if (isAuthenticated === false) {
    return (
      <LoginForm />
    )
  }

  return (
    <App />
  )
}

export default Index
