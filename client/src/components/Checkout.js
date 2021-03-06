// import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import React, { useState } from 'react'
// import nProgress from 'nprogress';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
// import { Router, useRouter } from 'next/dist/client/router';
// import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartState'
import { CURRENT_USER_QUERY } from './User'
import SickButton from './styles/SickButton'

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
    }
  }
`

// eslint-disable-next-line no-undef
const stripeLib = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE)

function CheckoutForm() {
  const history = useHistory()
  const [ref, setRef] = useState(null)
  const [error, setError] = useState()
  const stripe = useStripe()
  const elements = useElements()
  // const router = useRouter();
  const { closeCart } = useCart()
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  )
  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault()
    console.log('We gotta do some work..')
    // 2. Start the page transition
    // nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    // 4. Handle any errors from stripe
    if (error) {
      setError(error)
      // nProgress.done();
      return // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id
      }
    })
    console.log('Finished with the order!!')

    //clear card information
    ref.clear()

    // 6. Change the page to view the order
    history.push(`/order/${order.data.createOrder.id}`)

    // 7. Close the cart
    closeCart()

    // 8. turn the loader off
    //setLoading(false)
    // nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement onReady={(e) => setRef(e)} />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  )
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}

export { Checkout }
