import React, { Component, useRef, useState } from 'react'
import { HotKeys } from 'react-hotkeys'

import { useAuth0 } from '../lib/auth0'

import List from '../components/list'
import LoginForm from '../components/login-form'
import SingleLog from '../components/single-log'
import NavBar from '../components/nav-bar'
import ListenForHotKeys from '../components/listen-for-hotkeys'

import useSearchLogs from '../lib/use-search-logs'

const App = () => {
  const listRef = useRef(null)
  const searchResults = useSearchLogs()
  const [selectedLogIds, setSelectedLogIds] = useState<string[]>([])

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
      listRef.current.scrollToItem(nextIndex)
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
      listRef.current.scrollToItem(nextIndex)
    }
  }

  return (
    <ListenForHotKeys handlers={handlers}>
      <div className='page'>
        <div className='nav-bar'>
          <NavBar />
        </div>
        <div className='list'>
          <List
            {...searchResults}
            listRef={listRef}
            selectedLogIds={selectedLogIds}
            onClickLog={(event, id) => {
              if (event.ctrlKey) {
                setSelectedLogIds([...selectedLogIds, id])
              } else {
                setSelectedLogIds([id])
              }
            }}
          />
        </div>
        <div className='selected-list'>
          {selectedLogIds.map((logId) => <SingleLog logId={logId} />)}
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
          .selected-list { grid-area: selected-list; overflow-y: auto; }
        `}</style>
      </div>
    </ListenForHotKeys>
  )
}

export default App
