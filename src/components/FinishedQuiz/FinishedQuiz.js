import React from 'react'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/fontawesome-free-solid'

const FinishQuiz = styled.div`
  padding: 20px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0 10px;
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const Icon = styled.i`
  margin-left: 10px;
  color: ${({ isError  }) => isError ? `rgba(240, 87, 108, .7);` : `rgba(161, 240, 69, .7);`};
`

const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++
    }

    return total
  }, 0)


  return (
    <FinishQuiz>
      <List>
        { quiz.map((quizItem, index) => {
          const isError = results[quizItem.id] === 'error'
          return (
            <li
              key={index}
            >
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <Icon isError={isError}>
                <FontAwesomeIcon icon={isError ? faTimes : faCheck} />
              </Icon>
            </li>
          )

        }) }
      </List>

      <p>Правильно {successCount} из {quiz.length}</p>

      <div>
        <Button onClick={onRetry} type="primary">Повторить</Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </FinishQuiz>
  )
}

export default FinishedQuiz