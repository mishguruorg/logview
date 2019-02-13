import gql from 'graphql-tag'

import printLogs from '../../printLogs'

const ascend = async (client, argv) => {
  const stream = client.subscribe({
    variables: {
      input: {
        last: 20,
        userId: argv.user,
        type: argv.type,
        sentFrom: argv.sentFrom,
        payload: argv.payload
      }
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
    `
  })

  stream.subscribe({
    next(res) {
      const { results } = res.data.searchLogs
      printLogs('pretty', results.reverse())
    },
    error(error) {
      console.error(error)
    },
    complete() {
      console.log('stream completed')
    }
  })
}

export default ascend
