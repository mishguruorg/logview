import React from 'react'

import { useAuth0 } from '../lib/auth0'

import Filter from './filter'

type NavBarProps = {
  defaultFilter: string,
  onFilterChange: (filter: string) => void,
}

const NavBar = (props: NavBarProps) => {
  const { defaultFilter, onFilterChange } = props

  const { logout, user } = useAuth0()

  return (
    <div className='navbar'>
      <Filter 
        defaultFilter={defaultFilter}
        onFilterChange={onFilterChange}
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

        .user-profile {
          display: flex;
        }

        .user-name {
          color: #FFFFFF;
          margin-right: 12px;
          font-size: 12px; 
          line-height: 40px;
        }

        .logout-button {
          cursor: pointer;
          appearance: none;
        }
      `}</style>
    </div>
  )
}

export default NavBar
