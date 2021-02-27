import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from '../queries'

const Home = () => {
  const result = useQuery(ALL_PRODUCTS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return <div>{result.data.allProducts.map((p) => p.name).join(', ')}</div>
}

export default Home
