import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 15px;
`
const Label = styled.label`
    margin-bottom: 3px;
    padding: 0;
    display: block;
    font-weight: bold;
    color: ${props => isInvalid(props) ? `#f01f30` : `#000`};
`
const BaseInput = styled.input`
    display: block;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    padding: 7px;
    margin: 0 0 5px;
    width: 100%;
    outline: none;
    transition: all 300ms ease-in-out;
`
const ErrorMessage = styled.span` 
    color: #f01f30;
    font-size: 12px;
    font-weight: bold;
`

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const { type, label, value, onChange, errorMessage, valid, touched, shouldValidate } = props
  const inputType = type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <Container>
      <Label 
        valid={valid}
        touched={touched}
        shouldValidate={shouldValidate}
        htmlFor={htmlFor}>
          {label}
      </Label>
        <BaseInput
          type={inputType}
          id={htmlFor}
          value={value}
          onChange={onChange}
        />

      {
        isInvalid(errorMessage)
          ? <ErrorMessage>{errorMessage || 'Введите верное значение'}</ErrorMessage>
          : null
      }
    </Container>
  )
}

export default Input