import React, { useState, useMemo } from 'react'
import ReactTags from 'react-tag-autocomplete'

import StyleReactTags from './style-react-tags'

import useLogTypes from '../../lib/use-log-types'

type InputTypeProps = {
  defaultValue: string[],
  onChange: (type: string[]) => void,
}

const InputType = (props: InputTypeProps) => {
  const { defaultValue, onChange } = props

  const { logTypes } = useLogTypes()

  const tags = defaultValue.map((item) => ({ id: item, name: item }))

  const suggestions = logTypes
    .map((result) => result.type)
    .filter((result) => defaultValue.includes(result) === false)
    .map((result) => ({ id: result, name: result }))

  const suggestionsFilter = (suggestion, query) => {
    return suggestion.name.toLowerCase().includes(query.toLowerCase())
  }

  const onDelete = (index) => {
    const tags = defaultValue.slice(0)
    tags.splice(index, 1)
    onChange(tags)
  }

  const onAddition = (tag) => {
    const tags = defaultValue.slice(0)
    tags.push(tag.id)
    onChange(tags)
  }

  return (
    <>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        suggestionsFilter={suggestionsFilter}
        onDelete={onDelete}
        onAddition={onAddition}
        placeholderText='add type'
      />
      <StyleReactTags />
    </>
  )
}

export default InputType
