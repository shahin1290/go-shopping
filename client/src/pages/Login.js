import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN_USER } from '../mutations'

const Login = ({ setError }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser, result] = useMutation(LOGIN_USER, {
    
    update: (store, response) => {
      console.log('-->', response.data.addPerson)
      /*
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore
      })
      */
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.loginUser.value
      localStorage.setItem('shopping-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    loginUser({
      variables: {
        email,
        password
      }
    })

    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        
        <div>
          email{' '}
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
