import yargs from 'yargs'
import { selfupdate } from '@mishguru/selfupdate'

import * as editConfig from './commands/editConfig'
import * as filter from './commands/filter'
import * as read from './commands/read'
import * as use from './commands/use'

import config from './config'

yargs
  .strict()
  .option('server', {
    describe: 'Which server to use from the config',
    choices: Object.keys(config.servers),
  })
  .command(editConfig)
  .command(filter)
  .command(read)
  .command(use)
  .help()

const start = async () => {
  await selfupdate(require('../package.json'))
  yargs.parse()
}

start().catch(console.error)
