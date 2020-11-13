import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct()
  }

  render() {
    const {product} = this.props
    // console.log('THIS.PROPS IN SINGLE PROD', this.props)
    return (
      <div>
        <img src={product.imageUrl} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price / 100}</p>
        <p>{product.qty}</p>
      </div>
    )
  }
}

const mapState = state => {
  // state.product is empty
  // console.log('STATE IN SINGLE PROD', state)
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: () => dispatch(fetchProduct())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
