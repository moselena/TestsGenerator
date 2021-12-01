import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth'

const BaseDrawer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  padding: 20px 10px;
  box-sizing: border-box;
  background: #fff;
  transition: transform .22s ease-in;
  z-index: 90;
  transform: ${({isOpen}) => isOpen ? `translateX(0px)` : `translateX(-300px);`};
`
const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const Li = styled.li`
  margin-bottom: 15px;
`
const MenuItem = styled(Link)`
  color: #363d54;
  font-size: 30px;
  text-decoration: none;
  background-color: #fff;
  position: relative;
  padding: 0 20px 10px 20px;
  transition: opacity .3s;
  &:hover, &:active {
    opacity: .7;
  }
`

const Drawer = ({ isOpen, isAuthenticated, onClose }) => {
  const dispatch = useDispatch();

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
        <Li key={index}>
          <MenuItem
            to={link.to}
            onClick={handler}
          >
            {link.label}
          </MenuItem>
        </Li>
      )
    })
  }

  return (
    <>
      <BaseDrawer isOpen={isOpen}>
        <Ul>
          { renderLinks(links) }
        </Ul>
      </BaseDrawer>
      { isOpen ? <Backdrop onClick={onClose} /> : null }
    </>
  )
}

export default Drawer