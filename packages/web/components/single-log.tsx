import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import JSONlanguage from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import colorscheme from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow'

import { Log } from '../lib/types'
import DateString from './date-string'

SyntaxHighlighter.registerLanguage('json', JSONlanguage)

const GET_LOG = gql`
  query ($logId: ID!) {
    logs(ids: [$logId]) {
      id
      userId
      sentFrom
      type
      payload
      sentAt
    }
  }
`

type SingleLogProps = {
  logId: string
}

const SingleLog = (props: SingleLogProps) => {
  const {logId } = props

  const { loading, error, data } = useQuery(GET_LOG, {
    variables: {logId}
  })

  if (error) {
    console.error(error)
    return <>Error loding posts.</>
  }

  if (loading) {
    return <>Loading...</>
  }

  const log = data.logs[0]

  return (
    <div className='container'>
      <header className='header'>
        <span className='type'>{log.type}</span>
        <span className='sentAt'><DateString value={new Date(log.sentAt)} /></span>
      </header>
      <SyntaxHighlighter
        language='json'
        style={colorscheme}
        customStyle={{
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}
      >
        {JSON.stringify(log.payload, null, 2)}

      </SyntaxHighlighter>
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
