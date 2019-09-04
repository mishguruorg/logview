import React, { MouseEvent, Ref, PureComponent, CSSProperties } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import classNames from 'classnames'
import { connectMenu, ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from 'react-contextmenu'
import InfiniteLoader from 'react-window-infinite-loader'

import DateString from './date-string'

import { Log } from '../lib/types'

const CONTEXT_MENU_ID = 'list-item'

const ListItemContextMenu = connectMenu(CONTEXT_MENU_ID)((props) => {
  const { id, trigger } = props

  if (trigger == null) {
    return null
  }

  const { log } = trigger

  return (
    <ContextMenu id={id}>
      <SubMenu title={log.userId} hoverDelay={150}>
        <MenuItem>Filter</MenuItem>
        <MenuItem>Exclude</MenuItem>
      </SubMenu>
      <SubMenu title={log.sentFrom} hoverDelay={150}>
        <MenuItem>Filter</MenuItem>
        <MenuItem>Exclude</MenuItem>
      </SubMenu>
      <SubMenu title={log.type} hoverDelay={150}>
        <MenuItem>Filter</MenuItem>
        <MenuItem>Exclude</MenuItem>
      </SubMenu>
      <style jsx global>{`
.react-contextmenu {
  font-size: 13px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 0;
  color: #373a3c;
  margin: 2px 0 0;
  min-width: 160px;
  outline: none;
  padding: 5px 0;
  pointer-events: none;
  text-align: left;
  opacity: 0;
}

.react-contextmenu.react-contextmenu--visible {
  pointer-events: auto;
  z-index: 9999;
  opacity: 1;
}

.react-contextmenu-item {
  background: 0 0;
  border: 0;
  color: #373a3c;
  cursor: pointer;
  line-height: 1.5;
  padding: 3px 20px;
  text-align: inherit;
  white-space: nowrap;
}

.react-contextmenu-item.react-contextmenu-item--active,
.react-contextmenu-item.react-contextmenu-item--selected {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
  text-decoration: none;
}

.react-contextmenu-item.react-contextmenu-item--disabled,
.react-contextmenu-item.react-contextmenu-item--disabled:hover {
  background-color: transparent;
  border-color: rgba(0,0,0,.15);
  color: #878a8c;
}

.react-contextmenu-item--divider {
  border-bottom: 1px solid rgba(0,0,0,.15);
  cursor: inherit;
  margin-bottom: 3px;
  padding: 2px 0;
}
.react-contextmenu-item--divider:hover {
  background-color: transparent;
  border-color: rgba(0,0,0,.15);
}

.react-contextmenu-item.react-contextmenu-submenu {
	padding: 0;
}

.react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
}

.react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item:after {
  content: "▶";
  display: inline-block;
  position: absolute;
  right: 7px;
}
      `}</style>
    </ContextMenu>
  )
})

type ItemRendererProps = {
  index: number,
  style: CSSProperties,
  data: {
    logs: Log[],
    selectedLogIds: string[]
    onClickLog: (event: MouseEvent, logId: string) => void
    loadingMore: number
  },
}

class ItemRenderer extends PureComponent<ItemRendererProps> {
  render() {
    const { index, style, data } = this.props
    const { logs, selectedLogIds, onClickLog, loadingMore } = data

    if (index >= loadingMore) {
      return (
        <div
          key={index}
          style={style}
        >
          Loading more...
        </div>
      )
    }

    const log = logs[index]
    const even = index % 2 === 0
    const selected = selectedLogIds.includes(log.id)

    return (
      <ContextMenuTrigger
        key={index}
        id={CONTEXT_MENU_ID}
        collect={() => ({ log })}
      >
        <div
          className={classNames('row', { even, selected })}
          style={style}
          onClick={(event) => onClickLog(event, log.id)}
        >
          <span className='cell userId'>{log.userId}</span>
          <span className='cell sentFrom'>{log.sentFrom}</span>
          <span className='cell type'>{log.type}</span>
          <span className='cell sentAt'><DateString value={new Date(log.sentAt)} /></span>
          <style jsx>{`
            .row {
              display: flex;
              font-size: 13px;
              line-height: 20px;
              cursor: default;
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
      </ContextMenuTrigger>
    )
  }
}

type ListProps = {
  loading: boolean,
  loadingMore: boolean,
  error: Error,
  logs: Log[],
  selectedLogIds: string[],
  onClickLog: (event: MouseEvent, logId: string) => void,
  setListRef: (el: FixedSizeList) => void,
  hasMore: boolean,
  fetchMore: () => Promise<any>
}

const List = (props: ListProps) => {
  const { setListRef, loading, loadingMore, error, logs, selectedLogIds, onClickLog, hasMore, fetchMore } = props

  if (error) {
    console.error(error)
    return <div>Error loading posts.</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  const isItemLoaded = (index: number) => {
    return logs.length > index
  }

  const loadMoreItems = () => {
    return fetchMore()
  }

  return (
    <>
      <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={logs.length + (hasMore ? 10 : 0)}
          loadMoreItems={loadMoreItems}
        >{({ onItemsRendered, ref }) => (
          <FixedSizeList
            ref={(el) => {
              ref(el)
              setListRef(el)
            }}
            height={height}
            width={width}
            itemData={{
              logs, 
              selectedLogIds,
              onClickLog,
              loadingMore: logs.length
            }}
            itemCount={logs.length + (loadingMore ? 10 : 0)}
            itemSize={20}
            onItemsRendered={onItemsRendered}
          >
            {ItemRenderer}
          </FixedSizeList>
        )}</InfiniteLoader>
      )}
      </AutoSizer>
      <ListItemContextMenu />
    </>
  )
}

export default List
