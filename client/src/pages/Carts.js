import React, { useContext } from 'react'
import { useUser } from '../components/User'

import CartItem from '../components/CartItem'
import { Checkout } from '../components/Checkout'

/* const CREATE_ORDER = gql`
  mutation CREATE_ORDER(
    $amount: Float!
    $cardId: String
    $token: String
    $return_uri: String
  ) {
    createOrder(
      amount: $amount
      cardId: $cardId
      token: $token
      return_uri: $return_uri
    ) {
      id
      items {
        id
        product {
          description
          price
        }
        quantity
      }
      authorize_uri
    }
  }
` */

const calculateAmount = (carts) => {
  const amount = carts.reduce(
    (sum, cart) => sum + cart.quantity * cart.product.price,
    0
  )
  return amount * 100
}

const Carts = () => {
  const user = useUser()

  if (!user) return null

  return (
    <div style={{ width: '70%', margin: 'auto', marginTop: '50px' }}>
      {user.carts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr',
              widht: '100%'
            }}
          >
            <h3 style={{ margin: 'auto' }}>Description</h3>
            <h3 style={{ margin: 'auto' }}>Picture</h3>
            <h3 style={{ margin: 'auto' }}>Price</h3>
            <h3 style={{ margin: 'auto' }}>Quantity</h3>
            <h3 style={{ margin: 'auto' }}>Amount</h3>
            <h3 style={{ margin: 'auto' }}>Actions</h3>
          </div>

          <>
            {/* Body */}
            {user.carts.length > 0 &&
              user.carts.map((cart) => <CartItem key={cart.id} cart={cart} />)}
          </>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr',
              width: '100%'
            }}
          >
            <div style={{ margin: 'auto' }}></div>
            <div style={{ margin: 'auto' }}></div>
            <div style={{ margin: 'auto' }}></div>
            <div style={{ margin: 'auto' }}></div>
            <div style={{ margin: 'auto' }}>
              {user.carts.length > 0 && calculateAmount(user.carts) / 100}
            </div>
            <div style={{ margin: 'auto' }}></div>
          </div>
        </>
      )}

      <Checkout />
    </div>
  )
}

export default Carts
