import React, { PureComponent, CSSProperties } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import classNames from 'classnames'

import DateString from './date-string'

import { Log } from '../lib/types'

type ItemRendererProps = {
  index: number,
  style: CSSProperties,
  data: {
    logs: Log[],
    selectedLogId: string
  }
}

class ItemRenderer extends PureComponent<ItemRendererProps> {
  render() {
    const { index, style, data } = this.props
    const { logs, selectedLogId } = data
    const log = logs[index]
    const even = index % 2 === 0
    const selected = log.id === selectedLogId

    return (
      <div className={classNames('row', { even, selected })} style={style}>
        <span className='cell userId'>{log.userId}</span>
        <span className='cell sentFrom'>{log.sentFrom}</span>
        <span className='cell type'>{log.type}</span>
        <span className='cell sentAt'><DateString value={new Date(log.sentAt)} /></span>
        <style jsx>{`
          .row {
            display: flex;
            font-size: 13px;
            line-height: 20px;
          }
          .row.even {
            background: rgba(0, 0, 0, 0.04);
          }
          .row.selected {
            background: #2F80ED;
            color: #FFFFFF;
          }
          .cell {
            padding: 0 8px;
          }
          .userId {
            width: 50px;
          }
          .sentFrom {
            width: 200px;
          }
          .type {
            flex: 1;
          }
          .sentAt {
            width: 170px;
            text-align: right;
          }
        `}</style>
      </div>
    )
  }
}

type ListProps = {
  loading: boolean,
  error: Error,
  logs: Log[],
  selectedLogId: string
}

const List = (props: ListProps) => {
  const { loading, error, logs, selectedLogId } = props

  console.log({ loading, error, logs })

  if (error) {
    console.error(error)
    return <div>Error loading posts.</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <AutoSizer>
    {({ height, width }) => (
      <FixedSizeList
        height={height}
        width={width}
        itemData={{ logs, selectedLogId }}
        itemCount={logs.length}
        itemSize={20}
      >
        {ItemRenderer}
      </FixedSizeList>
    )}
    </AutoSizer>
  )
}

export default List
