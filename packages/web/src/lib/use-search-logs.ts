import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const SEARCH_LOGS = gql`
  query($afterId: ID, $afterDate: DateTime!, $userId: [ID!], $type: [String!]) {
    searchLogs(
      input: {
        last: 10
        afterID: $afterId
        afterDate: $afterDate
        type: $type
        userId: $userId
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
      }
    }
  }
`

interface UseSearchLogsOptions {
  userId: number[],
  type: string[],
  afterDate: Date,
}

const useSearchLogs = (options: UseSearchLogsOptions) => {
  const { userId, type, afterDate } = options

  const { networkStatus, error, data, fetchMore: nextQuery } = useQuery<any>(SEARCH_LOGS, {
    variables: {
      userId,
      type,
      afterDate,
    },
    notifyOnNetworkStatusChange: true,
  })

  let logs = []
  let hasMore = false

  if (networkStatus > 1 && error == null) {
    logs = data.searchLogs.results
    hasMore = data.searchLogs.cursors.hasNext
  }

  const fetchMore = async (options: { afterId: string }) => {
    const { afterId } = options

    return nextQuery({
      variables: {
        afterId
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
