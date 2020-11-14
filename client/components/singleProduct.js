import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props

    return (
      <div>
        <img src={product.imageUrl} style={{width: '300px'}} />
        <h2>{product.name}</h2>
        <h3>Price: ${product.price / 100}</h3>
        <p>{product.description}</p>
        {/* choose on of the following, or delete both if we run out of time */}
        <input
          type="number"
          name="qty"
          min="1"
          max={product.qty}
          placeholder="Qty"
        />
        <select name="qty">
          Please select
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button>Add to Cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
