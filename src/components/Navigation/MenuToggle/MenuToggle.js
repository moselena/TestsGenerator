import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faTimes } from '@fortawesome/fontawesome-free-solid'
import styled from 'styled-components'

const Toggle = styled.i`
  position: fixed;
  top: 40px;
  left: ${({isOpen}) => isOpen ? `320px;` : `40px;`};
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  transition: opacity, left .22s ease-in;
  z-index: 100;
  &:hover {
    opacity: .7;
  }
`

const MenuToggle = ({isOpen, onToggle}) => {

  return (
    <Toggle isOpen={isOpen}
      onClick={onToggle}>
      <FontAwesomeIcon icon={isOpen ? faTimes : faAlignJustify} />
    </Toggle>
  )
}

export default MenuToggle