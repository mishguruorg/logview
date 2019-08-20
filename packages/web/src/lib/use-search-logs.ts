import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const SEARCH_LOGS = gql`
  query {
    searchLogs(input: {
      last: 100,
      afterDate: "2019-08-18T00:00:00.000Z",
      type: ["unexpectedError"]
    }) {
      results {
        id
        userId
        sentFrom
        type
        sentAt
      }
    }
  }
`

const useSearchLogs = () => {
  const { loading, error, data } = useQuery(SEARCH_LOGS)
  const logs =
    (data != null && data.searchLogs != null && data.searchLogs.results) || []
  return { loading, error, logs }
}

export default useSearchLogs
