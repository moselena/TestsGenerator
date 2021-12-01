import React, { useEffect } from 'react'
import styled from 'styled-components'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

const BaseQuiz = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
`
const Heading = styled.h1`
  color: #fff;
  margin-left: 10px;
`
const QuizWrapper = styled.div`
  width: 600px;
`

export const Quiz = () => {

  const { id } = useParams()

  const quizState = useSelector((state) => state.quiz)
  const { results, isFinished, activeQuestion, answerState, quiz, loading } = quizState

  const dispatch = useDispatch()
  const dispatchFetchQuizById = (id) => dispatch(fetchQuizById(id))
  const dispatchQuizAnswerClick = (answerId) => dispatch(quizAnswerClick(answerId))
  const dispatchRetryQuiz = () => dispatch(retryQuiz())

  useEffect(() => {
    dispatchFetchQuizById(id)
  }, [id])

  useEffect(() => {
    return () => dispatchRetryQuiz()
  }, [])

  return (
    <BaseQuiz>
      <QuizWrapper>
        <Heading>Ответьте на все вопросы!</Heading>
        {
          loading || !quiz
          ? <Loader />
          : isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={dispatchRetryQuiz}
                />
              :  <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                onAnswerClick={dispatchQuizAnswerClick}
                quizLength={quiz.length}
                answerNumber={activeQuestion + 1}
                state={answerState}
              />
        }
      </QuizWrapper>
    </BaseQuiz>
  )
}