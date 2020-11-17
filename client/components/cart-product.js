import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct, changeQty} from '../store/cart-reducer'

const SingleCartProduct = props => {
  const {product, removeProduct, updateQty} = props
  const orderQty = product.orderQty
  return (
    <div>
      <h4>{product.name}</h4>
      <div className="cartProduct">
        <img src={product.imageUrl} style={{width: '80px', height: '90px'}} />
        <div>
          <p>Total price: ${product.price / 100 * orderQty}</p>
          <p>QTY: {orderQty}</p>
          <input
            onChange={event =>
              updateQty(product.id, Number(event.target.value))
            }
            type="number"
            name="qty"
            min="1"
            max={product.qty}
            value={orderQty}
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
    removeProduct: id => dispatch(deleteProduct(id)),
    updateQty: (id, newQty) => dispatch(changeQty(id, newQty))
  }
}

export default connect(null, mapDispatch)(SingleCartProduct)
