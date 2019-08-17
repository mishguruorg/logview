import gql from 'graphql-tag'
import { DateTime } from 'luxon'
import { ApolloClient } from 'apollo-client'

import printLogs from '../../printLogs'
import { Argv } from './types'

const ascend = async (client: ApolloClient<any>, argv: Argv) => {
  const afterDate = DateTime.utc()
    .minus({ days: 7 })
    .toJSDate()

  const stream = client.subscribe({
    variables: {
      input: {
        last: 20,
        userId: argv.user,
        type: argv.type,
        sentFrom: argv.sentFrom,
        payload: argv.payload,
        afterDate:
          argv.sentAfter != null ? new Date(argv.sentAfter) : afterDate,
      },
    },
    query: gql`
      subscription($input: SearchLogsInput!) {
        searchLogs(input: $input) {
          results {
            id
            payload
            sentAt
            sentFrom
            type
          }
        }
      }
    `,
  })

  stream.subscribe({
    next (res) {
      const { results } = res.data.searchLogs
      printLogs(argv.format, results.reverse())
    },
    error (error) {
      console.error(error)
    },
    complete () {
      console.info('stream completed')
    },
  })
}

export default ascend
