import yargs, { Argv } from 'yargs'
import { selfupdate } from '@mishguru/selfupdate'

import config from './config'

interface Options {
  server: string,
  disableSelfupdate: boolean,
}

const app = yargs as Argv<Options>

app
  .scriptName('logv')
  .strict()
  .option('server', {
    describe: 'Which server to use from the config',
    choices: Object.keys(config.servers),
  })
  .option('disable-selfupdate', {
    describe: 'Prevents the app from automatically updating itself',
    type: 'boolean',
  })
  .commandDir('./commands', { recurse: true, include: /index.[jt]s$/ })
  .middleware(async (argv) => {
    if (argv.disableSelfupdate !== true) {
      await selfupdate(require('../package.json'))
    } else {
      console.warn('⚠️ Skipping selfupdate!')
    }
  })
  .help()
  .wrap(100)

export default app
