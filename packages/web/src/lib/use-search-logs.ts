import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const SEARCH_LOGS = gql`
  query($afterID: ID, $afterDate: DateTime!, $type: [String!]) {
    searchLogs(
      input: {
        last: 10
        afterID: $afterID
        afterDate: $afterDate
        type: $type
      }
    ) {
      results {
        id
        userId
        sentFrom
        type
        sentAt
      }
      cursors {
        hasNext
        afterID
      }
    }
  }
`

interface UseSearchLogsOptions {
  type: string[],
  afterDate: Date,
}

const useSearchLogs = (options: UseSearchLogsOptions) => {
  const { type, afterDate } = options

  const { networkStatus, error, data, fetchMore: nextQuery } = useQuery<any>(SEARCH_LOGS, {
    variables: {
      type,
      afterDate,
    },
    notifyOnNetworkStatusChange: true,
  })

  let logs = []
  let hasMore = false

  if (networkStatus > 1 && error == null) {
    console.log({ networkStatus, error, data })
    logs = data.searchLogs.results
    hasMore = data.searchLogs.cursors.hasNext
  }

  const fetchMore = async () => {
    return nextQuery({
      variables: {
        afterID: data.searchLogs.cursors.afterID,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          ...prev,
          searchLogs: {
            ...prev.searchLogs,
            cursors: fetchMoreResult.searchLogs.cursors,
            results: [
              ...prev.searchLogs.results,
              ...fetchMoreResult.searchLogs.results,
            ],
          },
        }
      },
    })
  }

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3

  return { loading, loadingMore, error, logs, hasMore, fetchMore }
}

export default useSearchLogs
