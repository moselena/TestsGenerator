import React, { useState } from 'react'
import styled from 'styled-components'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { useSelector } from 'react-redux'

const BaseLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Layout = ({ children }) => {

  const [menu, setMenu] = useState(false)

  const toggleMenuHandler = () => {
    setMenu(!menu)
  }

  const menuCloseHandler = () => {
    setMenu(false)
  }

  const isAuthenticated = useSelector((state) => !!state.auth.token)

  return (
    <BaseLayout>

      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />

      <Main>
        { children }
      </Main>
      
    </BaseLayout>
  )
}