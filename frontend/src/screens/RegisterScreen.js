import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { AuthContext } from '../auth'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const context = useContext(AuthContext)

  const REGISTER_USER = gql`
    mutation registerUser(
      $name: String!
      $email: String!
      $password: String!
      $passwordConfirm: String!
    ) {
      registerUser(
        name: $name
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      ) {
        id
        email
        name
        token
      }
    }
  `

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: { name, email, password, passwordConfirm },
    update(_, { data: { registerUser: userData } }) {
      context.login(userData)
      history.push('/')
    },

    onError(err) {
      setError(err.message)
    }
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    await registerUser()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
