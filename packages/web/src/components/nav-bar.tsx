import React, { useState, useMemo } from 'react'
import Autosuggest from 'react-autosuggest'
import Fuse from 'fuse.js'
import { Highlighter } from 'react-fuzzy-highlighter'
import { formatResults } from 'react-fuzzy-highlighter/lib/formatResults'

import { useAuth0 } from '../lib/auth0'
import useLogTypes from '../lib/use-log-types'

type NavBarProps = {
  defaultFilter: string,
  onFilterChange: (filter: string) => void,
}

const NavBar = (props: NavBarProps) => {
  const { defaultFilter, onFilterChange } = props

  const { logout, user } = useAuth0()

  const [logTypeInput, setLogTypeInput] = useState(defaultFilter)

  const { logTypes } = useLogTypes()
  const [logTypeFilter, setLogTypeFilter] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(logTypes, {
      shouldSort: true,
      includeScore: true,
      includeMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [ 'type' ]
    })
  }, [logTypes])

  const filteredLogTypes = useMemo(() => {
    return formatResults(fuse.search(logTypeFilter)).slice(0, 10)
  }, [fuse, logTypeFilter])

  const handleInputChange = (event, { newValue }) => {
    setLogTypeInput(newValue)
  }

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      onFilterChange(logTypeInput)
    }
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setLogTypeFilter(value)
  }

  const onSuggestionsClearRequested = () => {
    setLogTypeFilter('')
  } 

  const getSuggestionValue = (suggestion) => {
    const result = suggestion.item.type
    return result
  }

  const renderSuggestion = (result: any) => {
    return (
      <div className='suggestion'>
        <Highlighter text={result.formatted.type} />
        <style jsx>{`
          .suggestion {
            font-size: 13px;
            font-family: 'Roboto Mono', monospace;
          }
        `}</style>
        <style jsx global>{`
          mark {
            font-family: inherit;
            text-decoration: underline;
            background: none;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className='navbar'>
      <Autosuggest
        suggestions={filteredLogTypes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value: logTypeInput,
          onChange: handleInputChange,
          onKeyDown: handleInputKeyDown
        }}
      />
      <style jsx global>{`
.react-autosuggest__container {
  flex: 1;
  position: relative;
}

.react-autosuggest__input {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  border: none;
  background: transparent;
  color: #FFFFFF;
  -webkit-appearance: none;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 20px;
}

.react-autosuggest__input--focused {
  outline: none;
}

.react-autosuggest__input::-ms-clear {
  display: none;
}

.react-autosuggest__input--open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.react-autosuggest__suggestions-container {
  display: none;
}

.react-autosuggest__suggestions-container--open {
  display: block;
  position: relative;
  top: -1px;
  border: 1px solid #aaa;
  background-color: #fff;
  font-weight: 300;
  font-size: 16px;
  z-index: 2;
}

.react-autosuggest__suggestions-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.react-autosuggest__suggestion {
  cursor: pointer;
  padding: 10px 20px;
}

.react-autosuggest__suggestion--highlighted {
  background-color: #ddd;
}
      `}</style>

      <div className='user-profile'>
        <p className='user-name'>{user.name}</p>
        <button
          className='logout-button'
          onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
        >
          Log out
        </button>
      </div>

      <style jsx>{`
        .navbar {
          height: 100%;
          background: #2F80ED;
          display: flex;
          justify-content: space-between;
        }

        .input {
          background: transparent;
          color: #FFFFFF;
          border: 0;
          margin-left: 20px;
          font-family: monospace;
        }

        .user-profile {
          display: flex;
        }

        .logout-button {
          cursor: pointer;
        }

        .user-name {
          color: #FFFFFF;
          margin-right: 12px;
        }
      `}</style>
    </div>
  )
}

export default NavBar
