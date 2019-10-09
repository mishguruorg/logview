import { useState } from 'react'

import { useAuth0 } from '../lib/auth0'

import LoginForm from '../components/login-form'
import App from '../components/app'

const Index = () => {
  const { isAuthenticated, loading } = useAuth0()

  let child = null

  if (loading || isAuthenticated === false) {
    child = (
      <LoginForm loading={loading} />
    )
  } else {
    child = (
      <App />
    )
  }

  return (
    <>
      {child}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;

          --white: #FFFFFF;
          --black: #000000;

          --c0-fg: #1a535c;

          /* https://flatuicolors.com/palette/gb */
          --protoss-pylon: #00a8ff;
          --vanadyl-blue: #0097e6;
          --lynx-white: #f5f6fa;
          --hint-of-pensive: #dcdde1;
          --mazarine-blue: #273c75;
          --pico-void: #192a56;

          /* https://flatuicolors.com/palette/fr */
          --good-samaritan: #3c6382;
          --forest-blues: #0a3d62;
          --livid: #6a89cc;
          --azraq-blue: #4a69bd;
          --spray: #82ccdd;
          --dupain: #60a3bc;
          --waterfall: #38ada9;
          --reef-encounter: #38ada9;
          --dark-sapphire: #0c2461;

          /* https://flatuicolors.com/palette/us */
          --mint-leaf: #00b894;
          --green-darner-tail: #74b9ff;
          --electron-blue: #0984e3;
          --american-river: #636e72;
          --dracular-orchid: #2d3436;
          --city-lights: #dfe6e9;

          /* color box */
          --g0: #ffffff;
          --g1: #f6f6f6;
          --g2: #ededed;
          --g3: #b7b7b7;
          --g4: #676767;
          --g5: #2c2c2c;
          --g6: #1a1a1a;

          /* nav bar */
          --c1-bg: var(--g4);
          --c1-fg: var(--g0);

          /* login screen gradient */
          --c2-bg: var(--g2);
          --c2-bg-1: var(--g3);
          --c2-fg: var(--g0);

          /* selection */
          --c3-bg: var(--g4);
          --c3-fg: var(--g0);

          /* white */
          --c4-bg: var(--g0);
          --c4-bg-1: var(--g1);
          --c4-fg: var(--g6);

          /* body background */
          --c5-bg: var(--g5);
          --c5-fg: var(--g6);

          --font-sans: 'Source Sans Pro', sans-serif;
          --font-monospace: 'Source Code Pro', monospace;
        }
        body, button, input, mark {
          font-family: var(--font-sans);
        }
        code {
          font-family: var(--font-monospace);
        }
      `}</style>
    </>
  )
}

export default Index
