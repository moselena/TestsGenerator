import React from 'react'
import styled from 'styled-components'
import AnswerItem from './AnswerItem/AnswerItem'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const AnswersList = ({answers, onAnswerClick, state}) => {
  return (
    <List>
      { answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state ? state[answer.id] : null}
          />
        )
      }) }
    </List>
  )
}

export default AnswersList