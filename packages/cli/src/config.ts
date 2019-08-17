import xdgBasedir from 'xdg-basedir'
import * as path from 'path'
import * as fs from 'fs'
import mkdirp from 'mkdirp'

import { ConfigFile, ServerConfig, RootArgv } from './types'

export const CONFIG_PATH = path.join(xdgBasedir.config, 'logview/config.json')
export const CONFIG_DIR = path.dirname(CONFIG_PATH)

const EXAMPLE_CONFIG = {
  default: 'example',
  servers: {
    example: {
      http: 'https://localhost',
      ws: 'wss://localhost',
    },
  },
}

if (fs.existsSync(CONFIG_PATH) === false) {
  mkdirp.sync(CONFIG_DIR)
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(EXAMPLE_CONFIG, null, 2))
}

let config: ConfigFile = {
  default: null,
  servers: {},
}

try {
  const userConfig = require(CONFIG_PATH)
  config.default = userConfig.default || null
  config.servers = userConfig.servers || {}
} catch (error) {
  console.error(`Error parsing ${CONFIG_PATH}.`, error)
}

export function getServer (argv: RootArgv): ServerConfig {
  return config.servers[argv.server || config.default]
}

export default config
