import React from 'react'
import CartStyles from './styles/CartStyles'
import { useUser } from './User'
import Supreme from './styles/Supreme'
import CartItem from './CartItem'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'

export default function Cart() {
  const user = useUser()

  if (!user) return null

  return (
    <CartStyles open>
      <header>
        <Supreme>{`${user.name}'s cart`} </Supreme>
      </header>
      <ul>
        {user.carts.length > 0 &&
          user.carts.map((cart) => <CartItem key={cart.id} cartItem={cart} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.carts))}</p>
        {/* <Checkout /> */}
      </footer>
    </CartStyles>
  )
}
