import React, { useState } from 'react'

import { useAuth0 } from '../lib/auth0'

type NavBarProps = {
  defaultFilter: string,
  onFilterChange: (filter: string) => void,
}

const NavBar = (props: NavBarProps) => {
  const { defaultFilter, onFilterChange } = props

  const { logout, user } = useAuth0()

  const [filterString, setFilterString] = useState(defaultFilter)

  const handleInputChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      onFilterChange(filterString)
    }
  }

  return (
    <div className='navbar'>
      <input
        type='text'
        value={filterString}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className='input'
      />

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
