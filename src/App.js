import React, { useEffect } from 'react'
import { Layout } from './hoc/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { Quiz } from './containers/Quiz/Quiz'
import { QuizList } from './containers/QuizList/QuizList'
import { Auth } from './containers/Auth/Auth'
import { QuizCreator } from './containers/QuizCreator/QuizCreator'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './store/actions/auth'

export const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const dispatchAutoLogin = () => dispatch(autoLogin())

  useEffect(() => {
    dispatchAutoLogin()
  }, [])

  let routes = [
    {
      path: '/auth',
      element: <Auth />
    },
    {
      path: '/quiz/:id',
      element: <Quiz />
    },
    {
      path: '/',
      element: <QuizList />
    },
    {
      path: '*',
      element: <QuizList />
    }
  ]

  if (isAuthenticated) {
    routes = [
      {
        path: '/quiz-creator',
        element: <QuizCreator />
      },
      {
        path: '/quiz/:id',
        element: <Quiz />
      },
      {
        path: '/',
        element: <QuizList />
      },
      {
        path: '*',
        element: <QuizList />
      }
    ]
  }

  return (
    <Layout>
      <Routes>
        { routes.map((route, i) => <Route key={i} path={route.path} element={route.element} />) }
      </Routes>
    </Layout>
  )
}
