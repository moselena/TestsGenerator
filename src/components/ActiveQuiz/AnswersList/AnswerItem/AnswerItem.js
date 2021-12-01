import React from 'react'
import styled from 'styled-components'

const itemBackground = ({state}) => {

  return state === 'success' ? `rgba(161, 240, 69, .7);` 
  : state === 'error' ? `rgba(240, 87, 108, .7);` : `none`
}

const itemBackgroundHover = ({state}) => {
  if (state !== 'success' && state !== 'error') {
    return `rgba(255, 255, 255, .2)`
  }

  return itemBackground({ state });
}

const Item = styled.li`
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  background: ${itemBackground};

  &:hover {
    background: ${itemBackgroundHover};
    transition: background .3s ease-in-out;
  }
`

const AnswerItem = ({state, onAnswerClick, answer}) => {

  return (
    <Item state= {state}
      onClick={() => onAnswerClick(answer.id)}
    >
      { answer.text }
    </Item>
  )
}

export default AnswerItem