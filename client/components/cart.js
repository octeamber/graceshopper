import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts} from '../store/cart-reducer'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  componentDidMount() {
    this.props.getCartProducts()
  }
  render() {
    // const {products} = this.props

    const products = [
      {
        name: 'Creamsicle Mug',
        price: 2400,
        description: 'A good coffee mug.',
        qty: 10,
        imageUrl: '../images/creamsicle_mug.jpg'
      },
      {
        name: 'Pink Mug',
        price: 2000,
        description: 'A small coffee mug.',
        qty: 10,
        imageUrl: '../images/pink_mug.jpg'
      }
    ]

    return (
      <div>
        <h1>Products in your cart: </h1>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h4>{product.name}</h4>
              <img
                src={product.imageUrl}
                style={{width: '60px', height: '80px'}}
              />
              <input
                type="number"
                name="qty"
                min="1"
                max={product.qty}
                placeholder="Qty"
              />
              <p>${product.price / 100}</p>
            </div>
          ))}
        </div>
        <button>checkout</button>
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
    getCartProducts: () => dispatch(fetchCartProducts())
  }
}

export default connect(mapState, mapDispatch)(UserCart)
