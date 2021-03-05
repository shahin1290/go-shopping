import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks.js'
import { CREATE_PRODUCT_MUTATION } from '../mutations'

function Sell(props) {
  const [errors, setErrors] = useState('')

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    description: '',
    price: ''
  })

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted() {
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.message)
    },
    variables: inputs
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await createProduct()
    if (res) {
      resetForm()
    }
  }

  return (
    <div className='form-container'>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Add Product</h1>
        <label htmlFor='image'>
          Image
          <input
            required
            type='file'
            id='image'
            name='photo'
            onChange={handleChange}
          />
        </label>
        <input
          label='Name'
          placeholder='Name..'
          name='name'
          type='text'
          value={inputs.name}
          error={errors.includes('name')}
          onChange={handleChange}
        />
        <input
          label='Description'
          placeholder='Description..'
          name='description'
          type='text'
          value={inputs.description}
          error={errors.includes('description')}
          onChange={handleChange}
        />
        <input
          label='Price'
          placeholder='Price..'
          name='price'
          type='number'
          value={inputs.price}
          error={errors.includes('price')}
          onChange={handleChange}
        />

        <button type='submit' primary>
          Add!
        </button>
      </form>
      {errors && <div className='ui error message'>{errors}</div>}
    </div>
  )
}

export default Sell
