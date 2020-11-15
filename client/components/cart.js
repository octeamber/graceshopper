import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts, checkoutProducts} from '../store/cart-reducer'
import SingleCartProduct from './cart-product'

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount() {
    this.props.getCartProducts()
  }
  async handleCheckout() {
    await this.props.checkout()
    this.props.history.push('cart/checkout')
  }
  render() {
    const {products} = this.props
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
        <button type="button" onClick={this.handleCheckout}>
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
    products: state.cart.products
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(fetchCartProducts()),
    checkout: () => dispatch(checkoutProducts())
  }
}

export default connect(mapState, mapDispatch)(UserCart)
