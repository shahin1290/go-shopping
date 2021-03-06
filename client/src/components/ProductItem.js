import React from 'react'
import ItemStyles from './styles/ItemStyles'
import { Link } from 'react-router-dom'
import AddToCart from './AddToCart'
import formatMoney from '../lib/formatMoney'
import PriceTag from './styles/PriceTag'
import Title from './styles/Title'

const ProductItem = ({ product }) => {
  return (
    <ItemStyles>
      <img src={product.photos[0].imageUrl} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonList'>
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id
            }
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id} />
        <button>Delete</button>
      </div>
    </ItemStyles>
  )
}

export default ProductItem
