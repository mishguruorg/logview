import pretty from './pretty'
import jq from './jq'
import dumper from './dumper'

const formats = {
  pretty,
  jq,
  dumper,
}

const printLogs = (format, logs) => {
  formats[format](logs)
}

export default printLogs
