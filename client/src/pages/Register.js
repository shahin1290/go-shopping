import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

// import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks.js'
import { REGISTER_USER } from '../mutations'

function Register(props) {
  // const context = useContext(AuthContext);
  const [errors, setErrors] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: ''
  })

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted() {
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.message)
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

  return (
    <div className='form-container'>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>
        <Form.Input
          label='Name'
          placeholder='Name..'
          name='name'
          type='text'
          value={inputs.name}
          error={errors.includes('name')}
          onChange={handleChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email..'
          name='email'
          type='email'
          value={inputs.email}
          error={errors.includes('email')}
          onChange={handleChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={inputs.password}
          error={errors.includes('password')}
          onChange={handleChange}
        />

        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {errors && <div className='ui error message'>{errors}</div>}
    </div>
  )
}

export default Register
