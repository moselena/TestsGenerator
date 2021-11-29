import React, { useState } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import { Auxiliary } from '../../hoc/Auxiliary/Auxiliary'
// import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

export const QuizCreator = () => {

  const dispatch = useDispatch()
  const quiz = useSelector((state) => state.create.quiz)

  const dispatchCreateQuizQuestion = (item) => dispatch(createQuizQuestion(item))
  const dispatchFinishCreateQuiz = () => dispatch(finishCreateQuiz())

  const [formState, setFormState] = useState({
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  })


  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = event => {
    event.preventDefault()

    const {question, option1, option2, option3, option4} = formState.formControls

    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      rightAnswerId: formState.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    dispatchCreateQuizQuestion(questionItem)

    setFormState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  const createQuizHandler = event => {
    event.preventDefault()
    
    setFormState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
    dispatchFinishCreateQuiz()
  }

  const changeHandler = (value, controlName) => {
    const formControls = { ...formState.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    setFormState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  const renderControls = () =>{
    return Object.keys(formState.formControls).map((controlName, index) => {
      const control = formState.formControls[controlName]

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </Auxiliary>
      )
    })
  }

  const selectChangeHandler = event => {
    setFormState({
      rightAnswerId: +event.target.value
    })
  }

    const select = <Select
      label="Выберите правильный ответ"
      value={formState.rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>

          { renderControls() }

          { select }

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!formState.isFormValid}
          >
            Добавить вопрос
          </Button>

          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>

        </form>
      </div>
    </div>
  )
}

// function mapStateToProps(state) {
//   return {
//     quiz: state.create.quiz 
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     createQuizQuestion: item => dispatch(createQuizQuestion(item)),
//     finishCreateQuiz: () => dispatch(finishCreateQuiz())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)