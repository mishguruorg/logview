import React from 'react'

type Props = {
  children?: React.ReactNode
}

const GradientBackground = (props: Props) => {
  const { children } = props
  return (
    <div className='page'>
      {children}
      <style jsx>{`
        .page {
          background: linear-gradient(241.37deg, var(--c2-bg), var(--c3-bg));
          background-size: 400% 400%;
          animation: GradientFade 45s ease infinite;

          height: 100vh;

          display: flex;
          flex-direction: vertical;
          align-items: center;
          justify-content: center;
        }

        @keyframes GradientFade {
          0% { background-position:0% 90% }
          50% { background-position:100% 11% }
          100% { background-position:0% 90% }
        }

      `}</style>
    </div>
  )
}

export default GradientBackground
