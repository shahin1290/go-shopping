import React, { useState, useEffect, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks.js'
import { LOGIN_USER } from '../mutations'
import { AuthContext } from '../context/auth'

function Login(props) {
  const context = useContext(AuthContext)

  const [errors, setErrors] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: inputs,
    update(_, { data: { loginUser: userData } }) {
      context.login(userData)
      props.history.push('/')
    },

    onError(err) {
      setErrors(err.message)
    }
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await loginUser()
    if (res) {
      resetForm()
    }
  }

  return (
    <div className='form-container'>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Login</h1>

        <Form.Input
          label='Email'
          placeholder='Email..'
          name='email'
          type='email'
          value={inputs.email}
          error={
            errors.includes('email') || errors.includes('wrong credentials')
          }
          onChange={handleChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={inputs.password}
          error={
            errors.includes('password') || errors.includes('wrong credentials')
          }
          onChange={handleChange}
        />

        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {errors && <div className='ui error message'>{errors}</div>}
    </div>
  )
}

export default Login
