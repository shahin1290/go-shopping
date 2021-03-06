import React from 'react'
import { useMutation } from '@apollo/client'
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
  const user = useUser()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      console.log(data)
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleAddToCart = async () => {
    if (!user) {
      return history.push('/')
    }
    await addToCart({ variables: { id } })
  }

  return (
    <button disabled={loading} type='button' onClick={handleAddToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  )
}
