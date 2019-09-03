import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const SEARCH_LOGS = gql`
  query($afterID: ID, $afterDate: DateTime!) {
    searchLogs(
      input: {
        last: 10
        afterID: $afterID
        afterDate: $afterDate
        type: ["unexpectedError"]
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
  afterDate: Date,
}

const useSearchLogs = (options: UseSearchLogsOptions) => {
  const { afterDate } = options

  const { networkStatus, error, data, fetchMore: nextQuery } = useQuery<any>(SEARCH_LOGS, {
    variables: {
      afterDate,
    },
    notifyOnNetworkStatusChange: true,
  })

  let logs = []
  let hasMore = false

  console.log({ networkStatus })

  if (networkStatus > 1 && error == null) {
    logs = data.searchLogs.results
    hasMore = data.searchLogs.cursors.hasNext
  }

  const fetchMore = async () => {
    console.log('Loading more')
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
