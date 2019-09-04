import React from 'react'
import { DateTime } from 'luxon'

const DATE_TIME = 'LLL d, y, HH:mm:ss'
const DATE_TIME_MS = DATE_TIME + '.SSS'

type Props = {
  value: Date,
  withMilliseconds?: boolean
}

const DateString = (props: Props) => {
  const { value, withMilliseconds } = props

  const formatString = withMilliseconds ? DATE_TIME_MS : DATE_TIME
  
  const string = DateTime.fromJSDate(value).toFormat(formatString)

  return (
    <>
      {string}
    </>
  )
}

export default DateString
