import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/product'
import {Link} from 'react-router-dom'
import ProductForm from './product-form'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  deleteProduct(product) {
    this.props.removeProduct(product)
  }

  render() {
    const {products} = this.props
    const {user} = this.props

    return (
      <div>
        <div className="row">
          {products.map(product => (
            <div className="column column-40" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <img src={product.imageUrl} />
              </Link>
              <p>${product.price / 100}</p>
              {user.isAdmin && (
                <button
                  onClick={() => {
                    this.deleteProduct(product)
                  }}
                >
                  REMOVE PRODUCT
                </button>
              )}
            </div>
          ))}
        </div>
        <div>{user.isAdmin && <ProductForm />}</div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    removeProduct: product => dispatch(deleteProduct(product.id))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
