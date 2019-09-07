import React, { useState, useMemo } from 'react'
import Autosuggest from 'react-autosuggest'
import Fuse from 'fuse.js'
import { Highlighter } from 'react-fuzzy-highlighter'
import { formatResults } from 'react-fuzzy-highlighter/lib/formatResults'

import useLogTypes from '../../lib/use-log-types'

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

type FilterProps = {
  defaultFilter: string,
  onFilterChange: (filter: string) => void,
}

const Filter = (props: FilterProps) => {
  const { defaultFilter, onFilterChange } = props

  const [logTypeInput, setLogTypeInput] = useState(defaultFilter)

  const { logTypes } = useLogTypes()
  const [logTypeFilter, setLogTypeFilter] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(logTypes, {
      shouldSort: true,
      includeScore: true,
      includeMatches: true,
      threshold: 0.4,
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


  return (
    <>
      <Autosuggest
        suggestions={filteredLogTypes}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={Suggestion}
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
  appearance: none;
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
    </>
  )
}

export default Filter
