import { Options } from 'yargs'
import { promises as fs } from 'fs'

import config, { CONFIG_PATH } from '../../config'

import { Argv } from './types'

export const command = 'use [server]'

export const describe = 'Set which server to use by default'

export const builder: Record<string, Options> = {
  server: {
    type: 'string',
  },
}

export async function handler (argv: Argv) {
  const { server } = argv

  const exists = Object.hasOwnProperty.call(config.servers, server)
  if (exists === false) {
    throw new Error(`Server "${server}" does not exist in config`)
  }

  config.default = server
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2))

  console.info(`Now using server: "${server}" by default.`)
}
