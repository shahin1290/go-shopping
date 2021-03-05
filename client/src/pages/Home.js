import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from '../queries'

import ProductItem from '../components/ProductItem'

const Home = () => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '40px',
        gridGap: '10px'
      }}
    >
      {data.allProducts.map((prod) => (
        <ProductItem key={prod.id} prod={prod} />
      ))}
    </div>
  )
}

export default Home
