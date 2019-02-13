import ascend from './ascend'
import descend from './descend'

import createClient from '../../client'
import { getServer } from '../../config'

export const command = ['$0', 'filter']

export const describe = 'Display a list of logs'

export const builder = {
  follow: {
    describe: 'Append new logs as they are created',
    alias: 'f',
    default: false,
    type: 'boolean'
  },
  lines: {
    describe: 'Number of logs to retrieve',
    alias: 'l',
    default: 20,
    type: 'number'
  },
  user: {
    describe: 'A list of user IDs to filter logs by',
    alias: 'u',
    type: 'array'
  },
  sentFrom: {
    describe: 'A list of service names to filter logs by',
    alias: 's',
    type: 'array'
  },
  type: {
    describe: 'A list of topic type to filter logs by',
    alias: 't',
    type: 'array'
  },
  payload: {
    describe: 'Filter logs by payload using SQL LIKE',
    alias: 'p',
    type: 'string'
  },
  before: {
    describe: 'Only display logs created before the specified date',
    alias: 'b',
    type: 'string'
  },
  after: {
    describe: 'Only display logs created after the specified date',
    alias: 'a',
    type: 'string'
  }
}

export async function handler(argv) {
  const client = createClient(getServer(argv))

  try {
    if (argv.follow) {
      await ascend(client, argv)
    } else {
      await descend(client, argv)
    }
  } catch (error) {
    process.exit(1)
  }
}
