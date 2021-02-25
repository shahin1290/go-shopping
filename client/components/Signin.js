import React, { useState, useContext } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      email
    }
  }
`

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        setUserInfo({
          email: '',
          password: ''
        })
        /* Router.push('/products') */
      }
    }
  })

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(userInfo)
      const res = await login()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ margin: '100px' }}>
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: '30%'
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{ margin: '5px', height: '30px' }}
            type='email'
            name='email'
            placeholder='Email'
            value={userInfo.email}
            onChange={handleChange}
          />
          <input
            style={{ margin: '5px', height: '30px' }}
            type='password'
            name='password'
            placeholder='Password'
            value={userInfo.password}
            onChange={handleChange}
          />
          <button
            style={{
              margin: '5px',
              padding: '10px',
              background: 'teal',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
            type='submit'
            disabled={loading}
          >
            Submit
          </button>
        </form>

        <div style={{ width: '30%', margin: 'auto' }}>
          <p>
            Forgot password?{' '}
            <span
              style={{ color: 'orange', cursor: 'pointer' }}
              onClick={() => Router.push('/signin/requestresetpassword')}
            >
              Click here
            </span>
          </p>
        </div>

        <div style={{ width: '30%', margin: 'auto' }}>
          {/* {error && (
            <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>
          )} */}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          width: '30%',
          justifyContent: 'center',
          margin: 'auto'
        }}
      >
        <p>-------------or---------------</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          margin: 'auto'
        }}
      >
        <button
          style={{
            margin: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            background: 'blue',
            border: 'none',
            color: 'white'
          }}
        >
          <a
            style={{ color: 'white', textDecoration: 'none' }}
            href='http://localhost:4444/auth/facebook'
          >
            Sign in with Facebook
          </a>
        </button>
        <br />
        <button
          style={{
            margin: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            background: 'red',
            border: 'none',
            color: 'white'
          }}
        >
          <a
            style={{ color: 'white', textDecoration: 'none' }}
            href='http://localhost:4444/auth/google'
          >
            Sign in with Google
          </a>
        </button>
      </div>
    </div>
  )
}

export default Signin
