import yargs from 'yargs'

import * as editConfig from './commands/editConfig'
import * as read from './commands/read'
import * as filter from './commands/filter'

import config from './config'

yargs
  .strict()
  .option('server', {
    describe: 'Which server to use from the config',
    choices: Object.keys(config.servers)
  })
  .command(editConfig)
  .command(read)
  .command(filter)
  .help()
  .parse()
