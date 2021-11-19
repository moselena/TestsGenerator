import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { Route, Routes } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/quiz-creator' element={<QuizCreator />}></Route>
          <Route path='/quiz/:id' element={<Quiz />}></Route>
          <Route path='/' element={<QuizList />}></Route>
        </Routes>
      </Layout>
    )
  }
}

export default App
