import React, { useState, useMemo } from 'react'

import { Filter } from '../../lib/types'

import Label from './label'
import InputType from './input-type'
import InputUser from './input-user'

type FilterProps = {
  defaultFilter: Filter,
  onFilterChange: (filter: Filter) => void,
}

const FilterBar = (props: FilterProps) => {
  const { defaultFilter, onFilterChange } = props

  const [logUserInput, setLogUserInput] = useState(defaultFilter.userId.join(' '))

  const handleChangeType = (type: string[]) => {
    onFilterChange({ ...defaultFilter, type })
  }

  const handleChangeUser = (userId: number[]) => {
    onFilterChange({ ...defaultFilter, userId })
  }

  return (
    <div className='filter-bar'>
      <Label>user:</Label>
      <InputUser
        defaultValue={defaultFilter.userId}
        onChange={handleChangeUser}
      />
      <Label>type:</Label>
      <InputType
        defaultValue={defaultFilter.type}
        onChange={handleChangeType}
      />
      <style>{`
        .filter-bar {
          flex: 1;
          display: flex;
          padding: 0 20px;
        }
      `}</style>
    </div>
  )
}

export default FilterBar
