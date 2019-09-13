import React, { useState } from 'react'

type InputUserProps = {
  defaultValue: number[],
  onChange: (type: number[]) => void,
}

const InputUser = (props: InputUserProps) => {
  const { defaultValue, onChange } = props

  const [inputValue, setInputValue] = useState(defaultValue.join(' '))

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      onChange(
        inputValue
        .split(' ')
        .filter((x) => x.trim().length > 0)
        .map((x) => parseInt(x, 10))
      )
    }
  }

  return (
    <>
      <input
        type='text'
        className='input'
        placeholder='*'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <style>{`
        .input {
          font-family: var(--font-monospace);
          font-size: 13px;
          line-height: 40px;
          background: transparent;
          color: var(--c1-fg);
          appearance: none;
          border: 0;
          padding: 0;

          width: 100px;
        }
      `}</style>
    </>
  )
}

export default InputUser
