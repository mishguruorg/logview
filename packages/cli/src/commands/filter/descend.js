import gql from 'graphql-tag'

import printLogs from '../../printLogs'

const descend = async (client, argv) => {
  const res = await client.query({
    variables: {
      input: {
        last: argv.lines,
        userId: argv.user,
        type: argv.type,
        sentFrom: argv.sentFrom,
        payload: argv.payload,
        sentBefore: argv.before,
        sentAfter: argv.after
      }
    },
    query: gql`
      query($input: SearchLogsInput!) {
        searchLogs(input: $input) {
          cursors {
            hasNext
            after
          }
          results {
            id
            payload
            sentAt
            sentFrom
            type
          }
        }
      }
    `
  })

  const { results, cursors } = res.data.searchLogs
  printLogs(argv.format, results)

  client.stop()
  process.exit(0)
}

export default descend