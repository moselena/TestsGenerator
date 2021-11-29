import React, { useState } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import { auth } from '../../store/actions/auth'
// import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dispatchAuth = (email, password, isLogin) => dispatch(auth(email, password, isLogin))

  const [formState, setFormState] = useState({
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  })

  const loginHandler = () => {
    dispatchAuth(
      formState.formControls.email.value,
      formState.formControls.password.value,
      true
    )
    navigate('/');
  }

  const registerHandler = () => {
    dispatchAuth(
      formState.formControls.email.value,
      formState.formControls.password.value,
      false
    )
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...formState.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    setFormState({formControls, isFormValid})
  }

  const renderInputs = () => {
    return Object.keys(formState.formControls).map((controlName, index) => {
      const control = formState.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>

          { renderInputs() }

          <Button
            type="success"
            onClick={loginHandler}
            disabled={!formState.isFormValid}
          >
            Войти
          </Button>

          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!formState.isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
}

// function mapDispatchToProps(dispatch) {
//   return {
//     auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
//   }
// }

// export default connect(null, mapDispatchToProps)(Auth)