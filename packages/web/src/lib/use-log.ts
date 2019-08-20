import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_LOG = gql`
  query($logId: ID!) {
    logs(ids: [$logId]) {
      id
      userId
      sentFrom
      type
      payload
      sentAt
    }
  }
`

interface UseLogProps {
  logId: string,
}

const useLog = (props: UseLogProps) => {
  const { logId } = props

  const client = useApolloClient()

  const cachedLog = client.readFragment({
    id: logId,
    fragment: gql`
      fragment singleLog on Log {
        id
        type
        sentFrom
        sentAt
      }
    `,
  })

  const { loading, error, data } = useQuery(GET_LOG, {
    variables: { logId },
  })

  if (error != null) {
    console.error(error)
  }

  const fullLog = loading === false && data.logs[0]

  const log = {
    ...cachedLog,
    ...fullLog,
  }

  return { loading, error, log }
}

export default useLog
