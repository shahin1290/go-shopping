import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useCart } from '../lib/cartState'

import gql from 'graphql-tag'

import { useUser, CURRENT_USER_QUERY } from './User'

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID!) {
    addToCart(id: $id) {
      id
      product {
        id
        description
        price
      }
      quantity
    }
  }
`

export default function AddToCart({ id }) {
  const history = useHistory()
  const { openCart } = useCart()

  const user = useUser()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleAddToCart = async () => {
    if (!user) {
      return history.push('/login')
    }
    const res = await addToCart({ variables: { id } })
    if (res) {
      openCart()
    }
  }

  return (
    <button disabled={loading} type='button' onClick={handleAddToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  )
}
