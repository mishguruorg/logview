import React, { Component, useRef, useState } from 'react'
import { HotKeys } from 'react-hotkeys'
import { DateTime } from 'luxon'
import Router from 'next/router'

import { useAuth0 } from '../lib/auth0'

import List from '../components/list'
import LoginForm from '../components/login-form'
import SingleLog from '../components/single-log'
import NavBar from '../components/nav-bar'
import ListenForHotKeys from '../components/listen-for-hotkeys'

import useSearchLogs from '../lib/use-search-logs'

const AFTER_DATE = DateTime.local().minus({ weeks: 1 }).set({ milliseconds: 0, seconds: 0, minutes: 0, hours: 0 }).toJSDate()

const setSelectedLogIds = (logs: string[]) => {
  Router.replace({ pathname: '/', query: { log: logs } })
}

const App = () => {
  const { query } = Router

  const selectedLogIds = query.log == null ? [] : Array.isArray(query.log) ? query.log : [query.log]

  const [filter, setFilter] = useState({
    userId: [],
    sentFrom: [],
    type: []
  })
  const [listRef, setListRef] = useState(null)

  const searchResults = useSearchLogs({
    afterDate: AFTER_DATE,
    userId: filter.userId,
    type: filter.type
  })

  const handlers = {
    MOVE_UP: () => {
      const lastSelectedLogId = selectedLogIds[selectedLogIds.length - 1]
      const index = lastSelectedLogId == null
        ? -1
        : searchResults.logs.findIndex((log) => {
          return log.id === lastSelectedLogId
        })
      const nextIndex = Math.max(0, index - 1)
      const log = searchResults.logs[nextIndex]
      setSelectedLogIds([log.id])
      listRef && listRef.scrollToItem(nextIndex)
    },
    MOVE_DOWN: () => {
      const maxLogIndex = searchResults.logs.length - 1
      const lastSelectedLogId = selectedLogIds[selectedLogIds.length - 1]
      const index = lastSelectedLogId == null
        ? -1
        : searchResults.logs.findIndex((log) => {
          return log.id === lastSelectedLogId
        })
      const nextIndex = Math.max(0, Math.min(maxLogIndex, index + 1))
      const log = searchResults.logs[nextIndex]
      setSelectedLogIds([log.id])
      listRef && listRef.scrollToItem(nextIndex)
    }
  }

  return (
    <ListenForHotKeys handlers={handlers}>
      <div className='page'>
        <div className='nav-bar'>
          <NavBar
            defaultFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
        <div className='list'>
          <List
            {...searchResults}
            setListRef={setListRef}
            selectedLogIds={selectedLogIds}
            onClickLog={(event, id) => {
              if (event.ctrlKey) {
                const index = selectedLogIds.indexOf(id)
                if (index < 0) {
                  setSelectedLogIds([...selectedLogIds, id])
                } else {
                  setSelectedLogIds([
                    ...selectedLogIds.slice(0, index),
                    ...selectedLogIds.slice(index + 1)
                  ])
                }
              } else {
                setSelectedLogIds([id])
              }
            }}
          />
        </div>
        <div className='selected-list'>
          {selectedLogIds.map((logId) => (
            <SingleLog key={logId} logId={logId} />
          ))}
        </div>
        <style jsx>{`
          .page {
            height: 100vh;
            display: grid;
            flex-direction: column;
            grid-template-rows: 40px 1fr;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "nav-bar nav-bar"
              "list selected-list";
          }
          .nav-bar { grid-area: nav-bar; }
          .list { grid-area: list }

          .selected-list {
            background: var(--c5-bg);
            grid-area: selected-list; overflow-y: auto;
          }
        `}</style>
      </div>
    </ListenForHotKeys>
  )
}

export default App
