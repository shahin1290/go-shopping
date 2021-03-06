import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from '../queries'
import ProductItem from '../components/ProductItem'
import styled from 'styled-components'

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`

const Home = () => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

  return (
    <ProductsListStyles>
      {data.allProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductsListStyles>
  )
}

export default Home
