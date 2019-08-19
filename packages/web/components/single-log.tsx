import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import JSONlanguage from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import colorscheme from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow'

import { Log } from '../lib/types'
import DateString from './date-string'
import useLog from '../lib/use-log'

SyntaxHighlighter.registerLanguage('json', JSONlanguage)

type SingleLogProps = {
  logId: string,
}

const SingleLog = (props: SingleLogProps) => {
  const { logId } = props

  const { log } = useLog({ logId })

  return (
    <div className='container'>
      <header className='header'>
        <span className='type'>{log.type}</span>
        <span className='sentAt'><DateString value={new Date(log.sentAt)} /></span>
      </header>
      {log.payload && <SyntaxHighlighter
        language='json'
        style={colorscheme}
        customStyle={{
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}
      >
        {JSON.stringify(log.payload, null, 2)}

      </SyntaxHighlighter>}
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
