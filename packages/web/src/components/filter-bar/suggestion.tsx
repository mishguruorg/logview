import React from 'react'
import { Highlighter } from 'react-fuzzy-highlighter'

type SuggestionProps = {
  formatted: any
}

const Suggestion = (props: SuggestionProps) => {
  const { formatted } = props
  return (
    <div className='suggestion'>
      <Highlighter text={formatted.type} />
      <style jsx>{`
        .suggestion {
          font-size: 13px;
          font-family: var(--font-monospace);
        }
      `}</style>
      <style jsx global>{`
        mark {
          color: inherit;
          font-family: inherit;
          text-decoration: underline;
          background: none;
        }
      `}</style>
    </div>
  )
}

export default Suggestion
