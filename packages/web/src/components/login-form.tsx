import React from 'react'
import classNames from 'classnames'

import { useAuth0 } from '../lib/auth0'

import GradientBackground from './gradient-background'
import ArrowRightIcon from './icon/arrow-right'
import LibraryBooksIcon from './icon/library-books'

type LoginFormProps = {
  loading: Boolean
}

const LoginForm = (props: LoginFormProps) => {
  const { loading } = props

  const { loginWithRedirect } = useAuth0()

  return (
    <GradientBackground>
      <div className={classNames('form', { loading })}>
        <div className='content'>
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
      </div>
      <style jsx>{`
        .form {
          width: 360px;
          padding: 30px;
          box-sizing: border-box;

          background: var(--c4-bg);
          box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
          border-radius: 4px;

          display: flex;

          animation: LoginFormExpand;
          transition: padding 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
        }

        .form.loading {
          padding: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          animation: LoadingSpinnerBounce 2s ease infinite;
        }

        @keyframes LoadingSpinnerBounce {
          0% { transform: scale(1, 1); }
          50% { transform: scale(2, 2); }
          100% { transform: scale(1, 1); }
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          opacity: 1;
          transition: opacity 3s;
        }
        .form.loading .content {
          opacity: 0;
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
          background: linear-gradient(135deg, var(--g4) 0%, var(--g5) 100%);
          border-radius: 20px;
          height: 40px;
          border: none;

          font-weight: 600;
          font-size: 12px;
          line-height: 14px;

          text-align: center;
          text-transform: uppercase;
          color: var(--g0);

          cursor: pointer;

          position: relative;
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
