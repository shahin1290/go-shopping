import React, { useState } from 'react'
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
      <form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>

        <input
          label='Name'
          placeholder='Name..'
          name='name'
          type='text'
          value={inputs.name}
          error={errors.includes('name')}
          onChange={handleChange}
        />
        <input
          label='Email'
          placeholder='Email..'
          name='email'
          type='email'
          value={inputs.email}
          error={errors.includes('email')}
          onChange={handleChange}
        />
        <input
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={inputs.password}
          error={errors.includes('password')}
          onChange={handleChange}
        />

        <button type='submit' primary>
          Register
        </button>
      </form>
      {errors && <div className='ui error message'>{errors}</div>}
    </div>
  )
}

export default Register
