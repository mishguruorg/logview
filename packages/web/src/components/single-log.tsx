import React from 'react'

import PayloadJSON from './payload-json'
import PayloadTable from './payload-table'

import { Log } from '../lib/types'
import DateString from './date-string'
import useLog from '../lib/use-log'

type SingleLogProps = {
  logId: string,
}

const SingleLog = (props: SingleLogProps) => {
  const { logId } = props

  const { log } = useLog({ logId })

  return (
    <div className='container'>
      <header className='header'>
        <span className='type'>{log.sentFrom} 🠒 {log.type}</span>
        <span className='sentAt'><DateString value={new Date(log.sentAt)} /></span>
      </header>
      {log.payload && <PayloadTable payload={log.payload} />}
      <style jsx>{`
        .container {
          margin: 10px;
          border: 1px solid rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
          padding: 0 10px;
        }
        .type {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default SingleLog
