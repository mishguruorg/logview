import React from 'react'

type PayloadTableProps = {
  payload: Record<string, any>
}

type PayloadRowProps = {
  parents?: string[]
  title: string,
  value: any
}

const PayloadRow = (props: PayloadRowProps) => {
  const { parents = [], title, value } = props

  let valueString = null
  let valueType = null
  let siblings = null

  if (typeof value == 'object' && value != null) {
    siblings = Object.entries(value).map(([subtitle, value]) => (
      <PayloadRow
        key={subtitle}
        parents={[...parents, title]}
        title={subtitle}
        value={value}
      />
    ))
    valueString = '{ ' + Object.keys(value).join(', ') + ' }'
    valueType = 'object'
  } else {
    valueString = value
    valueType = typeof value
  }

  return (
    <>
      <tr className='row'>
        <td className='cell title'>
          <span className='parent-title'>
            {parents.join('.')}
            {parents.length > 0 ? '.' : ''}
          </span>
          {title}
        </td>
        <td className={`cell value value-${valueType}`}>{valueString}</td>
        <style jsx>{`
          .row {
            display: contents;
          }
          .cell {
            font-size: 13px;
            line-height: 20px;
            padding: 0 10px;
          }
          .row:nth-child(2n) > .cell {
            background: var(--c4-bg-1);
          }
          .title {
            font-weight: 600;
          }
          .parent-title {
            color: hsl(0, 0%, 50%);
          }
          .value {
            white-space: pre-wrap;
            padding-left: 10px;
          }
          .value-object {
            font-style: italic;
            color: var(--turquoise);
          }
          .value-number {
            color: var(--blue);
            font-family: var(--font-monospace);
            font-weight: 600;
          }
        `}</style>
      </tr>
      {siblings}
    </>
  )
}

const PayloadTable = (props: PayloadTableProps) => {
  const { payload } = props

  return (
    <table className='table'>
      <tbody className='table-body'>
        {Object.entries(payload).map(([title, value]) => (
          <PayloadRow key={title} title={title} value={value} />
        ))}
      </tbody>
      <style jsx>{`
        .table {
          display: grid;
          grid-template-columns: auto auto;
          background: var(--c4-bg);
        }
        .table-body {
          display: contents;
        }
      `}</style>
    </table>
  )
}

export default PayloadTable
