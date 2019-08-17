import pretty from './pretty'
import jq from './jq'

import { Log, LogPrinter } from '../types'

const formats: Record<string, LogPrinter> = {
  pretty,
  jq,
}

const printLogs = (format: string, logs: Log[]) => {
  formats[format](logs)
}

export default printLogs
