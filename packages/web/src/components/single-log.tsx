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
        <span className='type'>{log.type}</span>
        <span className='sentAt'>
          <DateString
            value={new Date(log.sentAt)}
            format='cccc, LLL d, y, HH:mm:ss.SSS'
          />
        </span>
      </header>
      <header className='subheader'>
        <span className='id'>{log.id}</span>
        <span className='sentFrom'>{log.sentFrom}</span>
      </header>

      { loading && <LoadingPayload /> }
      {log.payload && <PayloadTable payload={log.payload} />}

      <style jsx>{`
        .container {
          margin: 10px;
        }

        /* extra scroll room */
        .container:last-of-type {
          margin-bottom: 500px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          height: 34px;
          font-size: 13px;
          line-height: 34px;
          padding: 0 10px;
          background: var(--c2-bg);
          color: var(--c4-fg);
        }

        .subheader {
          display: flex;
          justify-content: space-between;
          height: 24px;
          font-size: 13px;
          line-height: 24px;
          padding: 0 10px;
          background: var(--c2-bg-1);
          color: var(--c4-fg);
        }

        .id {
          font-family: var(--font-monospace);
        }
        .type {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default SingleLog
