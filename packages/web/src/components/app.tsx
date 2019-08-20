import React, { Component, KeyboardEvent, useRef, useState } from 'react'
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
  const [selectedLogId, setSelectedLogId] = useState(null)

  const handlers = {
    MOVE_UP: (event: KeyboardEvent) => {
      event.preventDefault()
      const index = searchResults.logs.findIndex((log) => {
        return log.id === selectedLogId
      })
      const nextIndex = index > 0 ? index - 1 : 0
      const log = searchResults.logs[nextIndex]
      setSelectedLogId(log.id)
      listRef.current.scrollToItem(nextIndex)
    },
    MOVE_DOWN: (event: KeyboardEvent) => {
      event.preventDefault()
      const maxLogIndex = searchResults.logs.length - 1
      const index = searchResults.logs.findIndex((log) => {
        return log.id === selectedLogId
      })
      const nextIndex = index < maxLogIndex ? index + 1 : maxLogIndex
      const log = searchResults.logs[nextIndex]
      setSelectedLogId(log.id)
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
            selectedLogId={selectedLogId}
            onClickLog={setSelectedLogId}
          />
        </div>
        <div className='single-log'>
          {selectedLogId && <SingleLog logId={selectedLogId} />}
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
              "list single-log";
          }
          .nav-bar { grid-area: nav-bar; }
          .list { grid-area: list }
          .single-log { grid-area: single-log; }
        `}</style>
      </div>
    </ListenForHotKeys>
  )
}

export default App
