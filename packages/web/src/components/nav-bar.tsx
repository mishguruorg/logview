import React from 'react'

import { useAuth0 } from '../lib/auth0'

const NavBar = () => {
  const { logout, user } = useAuth0()

  return (
    <div className='navbar'>
      <p className='user-name'>{user.name}</p>

      <button
        className='logout-button'
        onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
      >
        Log out
      </button>

      <style jsx>{`
        .navbar {
          height: 100%;
          background: #2F80ED;
          display: flex;
          justify-content: flex-end;
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
