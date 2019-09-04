import React from 'react'

import PayloadJSON from './payload-json'
import PayloadTable from './payload-table'

import { Log } from '../lib/types'
import DateString from './date-string'
import useLog from '../lib/use-log'

type SingleLogProps = {
  logId: string,
}

const LoadingPayload = () => {
  return (
    <>
      <div className='loading'>
        Loading...
      </div>
      <style jsx>{`
        .loading {
          font-style: italic;
          text-align: center;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          background: #FFFFFF;
        }
      `}</style>
    </>
  )
}

const SingleLog = (props: SingleLogProps) => {
  const { logId } = props

  const { loading, log } = useLog({ logId })

  return (
    <div className='container'>
      <header className='header'>
        <span className='type'>{log.sentFrom} 🠒 {log.type}</span>
        <span className='id'>{log.id}</span>
        <span className='sentAt'>
          <DateString value={new Date(log.sentAt)} withMilliseconds />
        </span>
      </header>

      { loading && <LoadingPayload /> }
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
          font-size: 13px;
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
