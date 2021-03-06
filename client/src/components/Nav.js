import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../lib/cartState'
import CartCount from './CartCount'
import { AuthContext } from '../context/auth'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'

function Nav() {
  const { user, logout } = useContext(AuthContext)
  const { openCart } = useCart()

  const data = useUser()

  return (
    <NavStyles>
      <Link to='/products'>Products</Link>
      {user && (
        <>
          <Link to='/sell'>Sell</Link>
          <Link to='/orders'>Orders</Link>
          <button onClick={logout}>Signout</button>
          <button type='button' onClick={openCart}>
            My Cart
            <CartCount
              count={data?.carts.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
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
