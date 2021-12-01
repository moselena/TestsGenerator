import React from 'react'
import styled from 'styled-components'
import AnswersList from './AnswersList/AnswersList'

const Quiz = styled.div`
  padding: 20px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  margin: 0 10px;
  box-sizing: border-box;
`
const Question = styled.p`
  display: flex;
  justify-content: space-between;
`

const ActiveQuiz = ({answerNumber, question, quizLength, state, answers, onAnswerClick}) => {
  return (
    <Quiz>
      <Question>
        <span>
          <strong>{answerNumber}.</strong>&nbsp;
          {question}
        </span>

        <small>{answerNumber} из {quizLength}</small>
      </Question>

      <AnswersList
        state={state}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </Quiz>
  )
}

export default ActiveQuiz