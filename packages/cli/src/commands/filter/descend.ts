import gql from 'graphql-tag'
import { DateTime } from 'luxon'
import { ApolloClient } from 'apollo-client'

import printLogs from '../../printLogs'

import { Argv } from './types'

const descend = async (client: ApolloClient<any>, argv: Argv) => {
  const afterDate = DateTime.utc()
    .minus({ days: 7 })
    .toJSDate()

  const res = await client.query({
    variables: {
      input: {
        last: argv.lines,
        userId: argv.user,
        type: argv.type,
        sentFrom: argv.sentFrom,
        payload: argv.payload,
        beforeID: argv.before,
        afterID: argv.after,
        beforeDate: argv.sentBefore != null ? new Date(argv.sentBefore) : null,
        afterDate:
          argv.sentAfter != null ? new Date(argv.sentAfter) : afterDate,
      },
    },
    query: gql`
      query($input: SearchLogsInput!) {
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

  const { results } = res.data.searchLogs
  printLogs(argv.format, results)

  client.stop()
  process.exit(0)
}

export default descend
