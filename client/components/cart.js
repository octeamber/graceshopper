import React from 'react'
import {connect} from 'react-redux'
import {checkoutProducts} from '../store/cart-reducer'
import SingleCartProduct from './cart-product'

/**
 * COMPONENT
 */

class UserCart extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  async handleCheckout() {
    const orderId = await this.props.checkout(this.props.userId)
    this.props.history.push({
      pathname: 'cart/checkout',
      state: {orderId: orderId}
    })
  }

  render() {
    const {products} = this.props
    if (!products.length) {
      return <h2>Your cart is empty!</h2>
    }
    return (
      <div>
        <h2>Products in your cart: </h2>
        <div>
          {products.map(product => (
            <SingleCartProduct key={product.id} product={product} />
          ))}
        </div>
        <div>
          Total amount: $
          {products.reduce(
            (acc, product) => product.price / 100 * product.orderQty + acc,
            0
          )}
        </div>
        <button type="button" className="button" onClick={this.handleCheckout}>
          checkout
        </button>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.cart,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    checkout: id => dispatch(checkoutProducts(id))
  }
}

export default connect(mapState, mapDispatch)(UserCart)
