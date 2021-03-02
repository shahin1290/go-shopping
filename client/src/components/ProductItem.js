import React from 'react'
import { useMutation, gql } from '@apollo/client'

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

const ProductItem = ({ prod, history }) => {
  const user = useUser()
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      console.log(data)
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleAddToCart = async (id) => {
    if (!user) {
      return history.push('/')
    }
    await addToCart({ variables: { id } })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
        border: 'solid 1px black',
        padding: '10px'
      }}
    >
      <div>
        <img
          src={prod.photos[0].imageUrl}
          alt={prod.description}
          width='250px'
        />
      </div>
      <h3>{prod.description}</h3>
      <h4>{prod.price} THB</h4>

      <button
        style={{
          background: 'green',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
          border: 'none'
        }}
        onClick={() => handleAddToCart(prod.id)}
      >
        {' '}
        Add to Cart
        {/* {loading ? 'Processing....' : 'Add to Cart'} */}
      </button>
    </div>
  )
}

export default ProductItem
