import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const ALL_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      description
      price
      image
      brand
      category
      countInStock
      rating
      numReviews
    }
  }
`

const HomeScreen = () => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS)

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error.message}</Message>
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {data.allProducts.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
