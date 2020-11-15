import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct} from '../store/cart-reducer'

const SingleCartProduct = props => {
  const {product, removeProduct} = props
  return (
    <div>
      <h4>{product.name}</h4>
      <div className="cartProduct">
        <img src={product.imageUrl} style={{width: '80px', height: '90px'}} />
        <div>
          <p>Total price: ${product.price / 100 * product.orderQty}</p>
          <input
            type="number"
            name="qty"
            min="1"
            max={product.qty}
            placeholder={product.orderQty}
          />
          <button type="button" onClick={() => removeProduct(product.id)}>
            remove product
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    removeProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(null, mapDispatch)(SingleCartProduct)
