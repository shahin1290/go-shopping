import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../util/hooks'
import Error from '../components/ErrorMessage'
import Form from '../components/styles/Form'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
    }
  }
`

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
    ) {
      id
      name
      description
      price
    }
  }
`

export default function UpdateProduct(props) {
  const id = props.match.params.id

  const [errors, setErrors] = useState('')

  const { data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  })

  const { inputs, handleChange, resetForm } = useForm(
    data?.product || {
      name: '',
      description: '',
      price: ''
    }
  )

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION, {
    onError(err) {
      setErrors(err)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price
      }
    })
    if (res) {
      resetForm()
    }
  }

  if (loading) return <p>loading...</p>
  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={handleSubmit}
      // Submit the inputfields to the backend:
      // TODO: Handle Submit!!!
      // const res = await createProduct();
      // clearForm();
      // // Go to that product's page!
      // Router.push({
      //   pathname: `/product/${res.data.createProduct.id}`,
      // });
    >
      <Error error={errors} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Update Product</button>
      </fieldset>
    </Form>
  )
}
