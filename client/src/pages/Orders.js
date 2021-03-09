import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import formatMoney from '../lib/formatMoney'
import OrderItemStyles from '../components/styles/OrderItemStyles'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          imageUrl
        }
      }
    }
  }
`

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0)
}

function Orders() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorMessage error={error} />
  const { allOrders } = data
  return (
    <div>
      <header>
        <title>Your Orders ({allOrders.length})</title>
      </header>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link to={`/order/${order.id}`}>
              <a>
                <div className='order-meta'>
                  <p>{countItemsInAnOrder(order)} Items</p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className='images'>
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.imageUrl}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  )
}

export default Orders
