import React from 'react'
import { DateTime } from 'luxon'

const DATE_TIME = 'LLL d, y, HH:mm:ss'

type Props = {
  value: Date,
  format?: string
}

const DateString = (props: Props) => {
  const { value, format } = props

  const formatString = format != null ? format : DATE_TIME
  
  const string = DateTime.fromJSDate(value).toFormat(formatString)

  return (
    <>
      {string}
    </>
  )
}

export default DateString
