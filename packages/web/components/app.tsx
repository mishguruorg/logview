import React, { Component, KeyboardEvent } from 'react'
import { useState } from 'react'
import { HotKeys } from 'react-hotkeys'

import { useAuth0 } from '../lib/auth0'

import List from '../components/list'
import LoginForm from '../components/login-form'
import SingleLog from '../components/single-log'
import NavBar from '../components/nav-bar'
import ListenForHotKeys from '../components/listen-for-hotkeys'

import useSearchLogs from '../lib/use-search-logs'

class App extends Component {
  listRef = React.createRef()

  render () {
    const searchResults = useSearchLogs()
    const [selectedLogId, setSelectedLogId] = useState(null)

    const handlers = {
      MOVE_UP: (event: KeyboardEvent) => {
        event.preventDefault()
        const index = searchResults.logs.findIndex((log) => {
          return log.id === selectedLogId
        })
        const log = searchResults.logs[index >= 0 ? index - 1 : 0]
        setSelectedLogId(log.id)
        console.log(this.listRef.current)
      },
      MOVE_DOWN: (event: KeyboardEvent) => {
        event.preventDefault()
        const index = searchResults.logs.findIndex((log) => {
          return log.id === selectedLogId
        })
        const log = searchResults.logs[index >= 0 ? index + 1 : 0]
        setSelectedLogId(log.id)
        console.log(this.listRef.current)
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
              listRef={this.listRef}
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
}

export default App
