import React from 'react'
import classes from './Drawer.module.css'
import { Link } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth'

const Drawer = ({ isOpen, isAuthenticated, onClose }) => {
  const dispatch = useDispatch();
  const cls = [classes.Drawer]

  if (!isOpen) {
    cls.push(classes.close)
  }

  const links = [
    {to: '/', label: 'Список'}
  ]

  const handleLogout = () => {
    onClose()
    dispatch(logout())
  }

  if (isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Создать тест'})
    links.push({to: '/auth', label: 'Выйти', handler: handleLogout})
  } else {
    links.push({to: '/auth', label: 'Авторизация'})
  }

  const renderLinks = links => {
    return links.map((link, index) => {
      const handler = link.handler || onClose;
      return (
        <li key={index}>
          <Link
            to={link.to}
            activeclassname={classes.active}
            onClick={handler}
          >
            {link.label}
          </Link>
        </li>
      )
    })
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>
          { renderLinks(links) }
        </ul>
      </nav>
      { isOpen ? <Backdrop onClick={onClose} /> : null }
    </>
  )
}

export default Drawer