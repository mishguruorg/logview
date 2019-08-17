import NavBar from '../components/nav-bar'
import List from '../components/list'
import LoginForm from '../components/login-form'

import { useAuth0 } from '../lib/auth0'

const Index = () => {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <LoginForm />
    )
  }

  return (
    <>
      <NavBar />
      <List />
    </>
  )
}

export default Index
