import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import DateString from './date-string'

export const searchLogsQuery = gql`
  query {
    searchLogs(input: { last: 20, afterDate: "2019-08-11T00:00:00.000Z" }) {
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

export default function PostList () {
  return (
    <Query query={searchLogsQuery}>
      {({ loading, error, data }) => {
        if (error) {
          console.error(error)
          return <div>Error loading posts.</div>
        }

        if (loading) {
          return <div>Loading</div>
        }

        return (
          <section>
            <table>
              <tbody>
                {data.searchLogs.results.reverse().map((log) => (
                  <tr key={log.id}>
                    <td>{log.userId}</td>
                    <td>{log.sentFrom}</td>
                    <td>{log.type}</td>
                    <td><DateString value={new Date(log.sentAt)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      }}
    </Query>
  )
}
