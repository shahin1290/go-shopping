import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { REGISTER_USER } from '../mutations'

const Register = ({ setError }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [registerUser] = useMutation(REGISTER_USER, {
    
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

  const submit = async (event) => {
    event.preventDefault()
    console.log(name, email, password);
    registerUser({
      variables: {
        name,
        email,
        password
      }
    })

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <h2>register</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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

        <button type='submit'>register</button>
      </form>
    </div>
  )
}

export default Register
