import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
// import { useUser } from './User'

function Nav() {
  const { user, logout } = useContext(AuthContext)
  // const data = useUser()

  return (
    <div>
      <Link href='/'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/cart'>Orders</Link>
          <Link onClick={logout}>Signout</Link>
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
          <Link href='/register'>Register</Link>
        </>
      )}
    </div>
  )
}

export default Nav
