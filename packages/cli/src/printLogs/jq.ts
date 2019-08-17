import { Log } from '../types'

const jq = (logs: Log[]) => {
  for (const log of logs) {
    console.info(JSON.stringify(log, null, 2))
  }
}

export default jq
