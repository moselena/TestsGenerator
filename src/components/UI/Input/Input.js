import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const { type, label, value, onChange, errorMessage } = props
  const inputType = type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />

      {
        isInvalid(errorMessage)
          ? <span>{errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input