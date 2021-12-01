import React, { useEffect }from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(90deg, #fd8355 0%, #f0576c 37%, #f79cbd 100%);
`
const Heading = styled.h1`
  color: #fff;
`
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const ListItem = styled.li`
  margin-bottom: 10px;
`
const QuizName = styled(Link)`
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #363f54;
  }
`

export const QuizList = () => {
  const dispatch = useDispatch()
  const quizState = useSelector((state) => state.quiz)
  const { quizes, loading } = quizState

  const dispatchFetchQuizes = () => dispatch(fetchQuizes())

  const renderQuizes = quizes => {
    return quizes.map(quiz => {
      return (
        <ListItem
          key={quiz.id}
        >
          <QuizName to={'/quiz/' + quiz.id}>
            {quiz.name}
          </QuizName>
        </ListItem>
      )
    })
  }

  useEffect(() => {
    dispatchFetchQuizes()
  }, [])

  return (
    <Container>
      <div>
        <Heading>Список тестов</Heading>
        {
          loading && quizes.length !== 0
          ? <Loader />
          : <List>
              { renderQuizes(quizes) }
            </List>
        }
      </div>
    </Container>
  )
}