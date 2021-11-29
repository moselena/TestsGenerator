import React, { useEffect }from 'react'
import classes from './QuizList.module.css'
import { Link } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
// import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

export const QuizList = () => {
  const dispatch = useDispatch()
  const quizState = useSelector((state) => state.quiz)
  const { quizes, loading } = quizState

  const dispatchFetchQuizes = () => dispatch(fetchQuizes())

  const renderQuizes = quizes => {
    return quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <Link to={'/quiz/' + quiz.id}>
            {quiz.name}
          </Link>
        </li>
      )
    })
  }

  useEffect(() => {
    dispatchFetchQuizes()
  }, [])

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {
          loading && quizes.length !== 0
          ? <Loader />
          : <ul>
              { renderQuizes(quizes) }
            </ul>
        }
      </div>
    </div>
  )
}

// function mapStateToProps(state) {
//   return { 
//     quizes: state.quiz.quizes,
//     loading: state.quiz.loading
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return { 
//     fetchQuizes: ()=>dispatch(fetchQuizes())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(QuizList) 