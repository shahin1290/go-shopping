import React from 'react'
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton'
import { useUser } from './User'
import Supreme from './styles/Supreme'
import CartItem from './CartItem'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useCart } from '../lib/cartState'
import { Checkout } from './Checkout'

export default function Cart() {
  const user = useUser()
  const { cartOpen, closeCart } = useCart()

  if (!user) return null

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{`${user.name}'s cart`} </Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {user.carts.length > 0 &&
          user.carts.map((cart) => <CartItem key={cart.id} cartItem={cart} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.carts))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  )
}
