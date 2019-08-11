import gql from 'graphql-tag'

import createClient from '../../client'
import { getServer } from '../../config'
import printLogs from '../../printLogs'

export const command = 'read [ids..]'

export const describe = 'Display details about selected logs'

export const builder = {
  format: {
    default: 'jq',
    type: 'string'
  }
}

export async function handler (argv) {
  const client = createClient(getServer(argv))

  const { data } = await client.query({
    variables: {
      ids: argv.ids
    },
    query: gql`
      query($ids: [ID!]!) {
        logs(ids: $ids) {
          id
          type
          sentAt
          sentFrom
          payload
          parent {
            id
            type
          }
          children {
            id
            type
          }
        }
      }
    `
  })

  for (const log of data.logs) {
    delete log.__typename
  }

  printLogs(argv.format, data.logs)

  client.stop()
  process.exit(0)
}
