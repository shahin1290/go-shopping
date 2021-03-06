import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useForm } from '../util/hooks.js'
import { LOGIN_USER } from '../mutations'
import { AuthContext } from '../context/auth'
import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'

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

  if (loading) return <p>loading.....</p>

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={errors} />
      <fieldset>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Sign In!</button>
      </fieldset>
    </Form>
  )
}

export default Login
