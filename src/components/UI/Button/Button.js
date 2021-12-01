import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: ${({type}) => type === 'primary' ? `#fff` : `#000`};
  margin-right: 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  background: ${({type}) => type === 'success' ? `rgba(161, 240, 69, 1)` : type === 'primary'? `#2884f6` : `rgba(240, 87, 108, 1)`};
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: inset 2px 2px 1px rgba(0, 0, 0, .3);
  }
  &:disabled {
    background: #ccc;
    color: #000;
    cursor: not-allowed;
  }
`

const Button = ({type, onClick, disabled, children}) => {

  return (
    <BaseButton
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  )
}

export default Button