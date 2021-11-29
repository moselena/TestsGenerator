import React, { useEffect } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { useParams } from 'react-router-dom'
// import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

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
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Answer all questions</h1>
        {
          loading || !quiz
          ? <Loader />
          : isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={dispatchRetryQuiz}
                />
              : <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                onAnswerClick={dispatchQuizAnswerClick}
                quizLength={quiz.length}
                answerNumber={activeQuestion + 1}
                state={answerState}
              />
        }
      </div>
    </div>
  )
}

// function mapStateToProps(state) {
//   return {
//     results: state.quiz.results, 
//     isFinished: state.quiz.isFinished,
//     activeQuestion: state.quiz.activeQuestion,
//     answerState: state.quiz.answerState,
//     quiz: state.quiz.quiz,
//     loading: state.quiz.loading
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchQuizById: id => dispatch(fetchQuizById(id)),
//     quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
//     retryQuiz: () => dispatch(retryQuiz())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Quiz)