import React from 'react'

type LabelProps = {
  children: React.ReactNode
}

const Label = (props: LabelProps) => {
  const { children } = props

  return (
    <div className='label'>
      {children}
      <style>{`
        .label {
          font-size: 13px;
          font-family: var(--font-monospace);
          line-height: 40px;
        }
      `}</style>
    </div>
  )
}

export default Label
