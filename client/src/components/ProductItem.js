import React from 'react'
import ItemStyles from './styles/ItemStyles'
import { Link } from 'react-router-dom'
// import AddToCart from './AddToCart'
import formatMoney from './lib/formatMoney'
import PriceTag from './styles/PriceTag'
import Title from './styles/Title'

const ProductItem = ({ product }) => {
  return (
    <ItemStyles>
      <img src={product.photos[0].imageUrl} alt={product.name} />
      <Title>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonList'>
        <Link to={`/edit/${product.id}`}>Edit ✏️</Link>
        <button>Delete</button>
      </div>
    </ItemStyles>
  )
}

export default ProductItem
