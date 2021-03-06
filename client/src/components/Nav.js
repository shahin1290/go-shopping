import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import NavStyles from './styles/NavStyles'

function Nav() {
  const { user, logout } = useContext(AuthContext)
  // const data = useUser()

  return (
    <NavStyles>
      <Link to='/products'>Products</Link>
      {user && (
        <>
          <Link to='/sell'>Sell</Link>
          <Link to='/cart'>Orders</Link>
          <Link onClick={logout}>Signout</Link>
        </>
      )}
      {!user && (
        <>
          <Link to='/login'>Log In</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </NavStyles>
  )
}

export default Nav
