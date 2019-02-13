import chalk from 'chalk'
import { DateTime } from 'luxon'
import { get as getWindowSize } from 'window-size'
import rightPad from 'pad-right'
import leftPad from 'left-pad'

const column = (text, size, pad = rightPad) => pad(text, size, ' ').slice(0, size).replace(/\n/g, '')

const SENT_FROM_SIZE = 22
const TYPE_SIZE = 40
const DATE_SIZE = 25

const formatPayload = (payload, size) => {
  const text = Object.entries(payload)
    .filter(([key]) => {
      return [
        '__turbine__'
      ].includes(key) === false
    })
    .map(([key, value]) => {
      return `${key}: ${value}`
    }).join(', ')

  return column(text, size)
}

const printLogs = (results) => {
  if (results.length === 0) {
    return
  }

  const { width } = getWindowSize()

  const idSize = results[0].id.toString().length + 1
  const infoSize = width - idSize - SENT_FROM_SIZE - TYPE_SIZE - DATE_SIZE

  for (const log of results) {
    const { id, type, payload, sentFrom, sentAt } = log
    const formattedSentAt = DateTime.fromISO(sentAt).toFormat('FF')
    console.log([
      chalk.blue(column(id, idSize)),
      chalk.white(column(sentFrom || '[unknown]', SENT_FROM_SIZE)),
      chalk.green(column(type, TYPE_SIZE)),
      formatPayload(payload, infoSize),
      chalk.magenta(column(formattedSentAt, DATE_SIZE, leftPad))
    ].join(''))
  }
}

export default printLogs
