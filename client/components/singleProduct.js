import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {addProductToCart} from '../store/cart-reducer'
import UpdateProductForm from './update-product-form'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      orderQty: 1
    }
    this.handleSubmitProduct = this.handleSubmitProduct.bind(this)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  handleSubmitProduct(event) {
    event.preventDefault()
    this.props.addProduct(this.props.product, this.state.orderQty)
  }

  render() {
    const {product} = this.props
    const {user} = this.props

    return (
      <div>
        <img src={product.imageUrl} style={{width: '300px'}} />
        <h2>{product.name}</h2>
        <h3>Price: ${product.price / 100}</h3>
        <p>{product.description}</p>
        <input
          type="number"
          name="qty"
          min="1"
          max={product.qty}
          value={this.state.orderQty}
          onChange={event =>
            this.setState({orderQty: Number(event.target.value)})
          }
        />
        <button onClick={this.handleSubmitProduct}>Add to Cart</button>
        <div>{user.isAdmin && <UpdateProductForm />}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    addProduct: (product, orderQty) =>
      dispatch(addProductToCart(product, orderQty))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
