import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts} from '../store/cart'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  componentDidMount() {
    this.props.getCartProducts()
  }
  render() {
    const {products} = this.props

    return (
      <div>
        <h1>Products in your cart: </h1>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <img src={product.imageUrl} style={{width: '300px'}} />
              </Link>
              <p>${product.price / 100}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: () => dispatch(fetchCartProducts())
  }
}

export default connect(mapState, mapDispatch)(UserCart)
