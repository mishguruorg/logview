import yargs from 'yargs'
import { selfupdate } from '@mishguru/selfupdate'

import * as editConfig from './commands/editConfig'
import * as read from './commands/read'
import * as filter from './commands/filter'
import * as use from './commands/use'

import config from './config'
import pkg from '../package.json'

const argv = yargs
  .strict()
  .option('server', {
    describe: 'Which server to use from the config',
    choices: Object.keys(config.servers)
  })
  .command(editConfig)
  .command(read)
  .command(filter)
  .command(use)
  .help()


const start = async () => {
  await selfupdate(pkg)
  yargs.parse()
}

start().catch(console.error)
