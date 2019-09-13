import React from 'react'

import { useAuth0 } from '../lib/auth0'
import { Filter } from '../lib/types'

import FilterBar from './filter-bar'

type NavBarProps = {
  defaultFilter: Filter,
  onFilterChange: (filter: Filter) => void,
}

const NavBar = (props: NavBarProps) => {
  const { defaultFilter, onFilterChange } = props

  const { logout, user } = useAuth0()

  return (
    <div className='navbar'>
      <FilterBar
        defaultFilter={defaultFilter}
        onFilterChange={onFilterChange}
      />

      <button
        className='logout-button'
        onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
      >
        Log out
      </button>

      <style jsx>{`
        .navbar {
          height: 100%;
          background: var(--c1-bg);
          color: var(--c1-fg);
          display: flex;
          justify-content: space-between;
        }

        .logout-button {
          cursor: pointer;
          appearance: none;
          background: transparent;
          border: none;
          color: var(--c1-fg);
        }
        .logout-button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default NavBar
