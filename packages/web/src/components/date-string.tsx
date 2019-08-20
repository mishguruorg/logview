import React from 'react'
import { DateTime } from 'luxon'

type Props = {
  value: Date
}

const DateString = (props: Props) => {
  const { value } = props
  const string = DateTime.fromJSDate(value).toFormat('LLL d, y, HH:mm:ss')

  return (
    <>
      {string}
    </>
  )
}

export default DateString
