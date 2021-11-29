import React, { useState } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
// import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

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
    <div className={classes.Layout}>

      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />

      <main>
        { children }
      </main>
    </div>
  )
}

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: !!state.auth.token
//   }
// }

// export default connect(mapStateToProps)(Layout)