import { Options } from 'yargs'
import gql from 'graphql-tag'

import createClient from '../../client'
import { getServer } from '../../config'
import printLogs from '../../printLogs'

import { Argv } from './types'

export const command = 'read [ids...]'

export const describe = 'Display details about selected logs'

export const builder: Record<string, Options> = {
  format: {
    default: 'jq',
    type: 'string',
  },
}

export async function handler (argv: Argv) {
  const client = await createClient(getServer(argv))

  const { data } = await client.query({
    variables: {
      ids: argv.ids,
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
    `,
  })

  printLogs(argv.format, data.logs)

  client.stop()
  process.exit(0)
}
