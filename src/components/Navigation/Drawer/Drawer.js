import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { Link } from 'react-router-dom'

const links = [
  {to: "/", label: "List", exact: true},
  {to: "/auth", label: "Auth", exact: false},
  {to: "/quiz-creator", label: "Create Test", exact: false}
]

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Link
            to={link.to}
            exaxt={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </Link>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer