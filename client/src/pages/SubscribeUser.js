import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useMutation } from '@apollo/client'

import { CREATE_SUBSCRIPTION_MUTATION } from '../mutations'

function SubscribeUser(props) {
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION_MUTATION)
  /*   onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business, ${data.email}`)
      })
    })
  } */

  // ...

  return (
    <div>
      <StripeCheckout
        token={async (token) => {
          const res = await createSubscription({ variables: {source: token.id} })
          console.log(res);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
      />
    </div>
  )
}

export default SubscribeUser
