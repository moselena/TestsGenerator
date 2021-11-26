import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Logout from './components/Logout/Logout'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/auth'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

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
    ];

    if (this.props.isAuthenticated) {
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
          path: '/logout',
          element: <Logout />
        },
        {
          path: '*',
          element: <QuizList />
        }
      ];
    }

    return (
      <Layout>
        <Routes>
          { routes.map((route, i) => <Route key={i} path={route.path} element={route.element} />) }
        </Routes>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
