import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_LOG_TYPES = gql`
  query {
    logTypes {
      type
    }
  }
`

const useLogTypes = () => {
  const client = useApolloClient()

  const { loading, error, data } = useQuery(GET_LOG_TYPES)

  if (error != null) {
    console.error(error)
  }

  let logTypes = []
  if (loading === false && error == null) {
    logTypes = data.logTypes
  }

  return { loading, error, logTypes }
}

export default useLogTypes
