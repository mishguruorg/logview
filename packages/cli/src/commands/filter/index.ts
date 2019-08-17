import { Options } from 'yargs'

import ascend from './ascend'
import descend from './descend'

import createClient from '../../client'
import { getServer } from '../../config'

import { Argv } from './types'

export const command = ['$0', 'filter']

export const describe = 'Display a list of logs'

export const builder: Record<string, Options> = {
  follow: {
    describe: 'Append new logs as they are created',
    alias: 'f',
    default: false,
    type: 'boolean',
  },
  lines: {
    describe: 'Number of logs to retrieve',
    alias: 'n',
    default: 20,
    type: 'number',
  },
  format: {
    default: 'pretty',
    type: 'string',
  },
  user: {
    describe: 'A list of user IDs to filter logs by',
    alias: 'u',
    type: 'array',
  },
  sentFrom: {
    describe: 'A list of service names to filter logs by',
    alias: 's',
    type: 'array',
  },
  type: {
    describe: 'A list of topic type to filter logs by',
    alias: 't',
    type: 'array',
  },
  payload: {
    describe: 'Filter logs by payload using SQL LIKE',
    alias: 'p',
    type: 'string',
  },
  before: {
    describe: 'Only display logs with an ID before the specified ID',
    alias: 'b',
    type: 'string',
  },
  after: {
    describe: 'Only display logs with an ID after the specified ID',
    alias: 'a',
    type: 'string',
  },
  sentBefore: {
    describe: 'Only display logs created before the specified date',
    type: 'string',
  },
  sentAfter: {
    describe: 'Only display logs created after the specified date',
    type: 'string',
  },
}

export async function handler (argv: Argv) {
  const client = await createClient(getServer(argv))

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
