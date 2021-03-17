import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { useUser, CURRENT_USER_QUERY } from '../components/User'

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID!, $quantity: Int!) {
    addToCart(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`

const CartScreen = ({ match, location, history }) => {
  const user = useUser()

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const productId = match.params.id

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      addToCart({ variables: { id: productId, quantity } })
    }
  }, [addToCart, productId, quantity])

  const removeFromCartHandler = (id) => {
    //dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  if (!user) return null

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {user.carts.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {user.carts.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        addToCart({
                          variables: {
                            id: item.product.id,
                            quantity: e.target.value
                          }
                        })
                      }
                    >
                      {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {user.carts.reduce((acc, item) => acc + item.quantity, 0)})
                items
              </h2>
              $
              {user.carts
                .reduce(
                  (acc, item) => acc + item.quantity * item.product.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={user.carts.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
