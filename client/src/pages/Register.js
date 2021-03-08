import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks.js'
import { REGISTER_USER } from '../mutations'
import Form from '../components/styles/Form'
import Error from '../components/ErrorMessage'

function Register(props) {
  const [errors, setErrors] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: ''
  })

  const [registerUser, { data, loading }] = useMutation(REGISTER_USER, {
    onCompleted() {
      props.history.push('/')
    },
    onError(err) {
      setErrors(err)
    },
    variables: inputs
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await registerUser()
    if (res) {
      resetForm()
    }
  }

  if (loading) return <p>loading.....</p>

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <Error error={errors} />
      <fieldset>
        {data?.registerUser && (
          <p>
            Signed up with {data.registerUser.email} - Please Go Head and Sign
            in!
          </p>
        )}
        <label htmlFor='email'>
          Your Name
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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

export default Register
