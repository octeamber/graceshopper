import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const {products} = this.props
    // console.log('This is the props', this.props)
    return (
      <div>
        <h1>All Products</h1>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <img src={product.imageUrl} style={{width: '300px'}} />
              </Link>
              <p>{product.price}</p>
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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
