import yargs, { Argv } from 'yargs'
import { selfupdate } from '@mishguru/selfupdate'

import * as editConfig from './commands/editConfig'
import * as filter from './commands/filter'
import * as read from './commands/read'
import * as use from './commands/use'

import config from './config'

type Options = {
  server: string,
  disableSelfupdate: boolean,
}

const client = yargs as Argv<Options>

client
  .strict()
  .option('server', {
    describe: 'Which server to use from the config',
    choices: Object.keys(config.servers),
  })
  .option('disable-selfupdate', {
    describe: 'Prevents the app from automatically updating itself',
    type: 'boolean',
  })
  .command(editConfig)
  .command(filter)
  .command(read)
  .command(use)
  .middleware(async (argv) => {
    if (argv.disableSelfupdate !== true) {
      await selfupdate(require('../package.json'))
    } else {
      console.warn('⚠️ Skipping selfupdate!')
    }
  })
  .help()
  .parse()
