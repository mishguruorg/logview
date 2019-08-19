import React from 'react'

import { useAuth0 } from '../lib/auth0'

import GradientBackground from './gradient-background'
import ArrowRightIcon from './icon/arrow-right'
import LibraryBooksIcon from './icon/library-books'

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <GradientBackground>
      <div className='form'>
        <h1 className='title'>
          <span className='libraryBooks'>
            <LibraryBooksIcon />
          </span>
          Logview
        </h1>
        <button className='loginButton' onClick={() => loginWithRedirect()}>
          Log In With Auth0
          <span className='arrowRight'>
            <ArrowRightIcon/>
          </span>
        </button>
      </div>
      <style jsx>{`
        .form {
          width: 360px;
          padding: 30px;
          box-sizing: border-box;

          background: #FFFFFF;
          box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
          border-radius: 4px;

          display: flex;
          flex-direction: column;
        }
        .libraryBooks {
          margin-right: 10px;
          vertical-align: -2px;
        }
        .title {
          font-size: 19px;
          text-align: center;
          text-transform: uppercase;
        }
        .loginButton {
          background: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);
          border-radius: 20px;
          height: 40px;
          border: none;

          font-weight: 600;
          font-size: 12px;
          line-height: 14px;

          text-align: center;
          text-transform: uppercase;
          color: #FFFFFF;

          cursor: pointer;

          position: relative;
          transition: opacity 0.15s;
        }
        .loginButton:hover {
          opacity: 0.5;
        }
        .arrowRight {
          position: absolute;
          right: 0%;
          margin-right: 12px;
        }
      `}</style>
    </GradientBackground>
  )
}

export default LoginForm
