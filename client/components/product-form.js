import React from 'react'
import {connect} from 'react-redux'
import {postNewProduct} from '../store/product'

export class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      price: null,
      qty: null,
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const addProduct = this.props.addProduct
    addProduct({
      name: this.state.productName,
      price: this.state.price,
      qty: this.state.qty,
      description: this.state.description
    })
  }

  render() {
    const state = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="productName">
              {' '}
              Product Name:{' '}
              <span className={state.productName ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="productName"
              type="string"
              value={state.productName}
            />
            <label htmlFor="price">
              {' '}
              Price:{' '}
              <span className={state.price ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="price"
              type="number"
              value={state.price}
            />
            <label htmlFor="description">
              {' '}
              Description:{' '}
              <span className={state.description ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="description"
              type="text"
              value={state.description}
            />
            <label htmlFor="qty">
              {' '}
              Qty:{' '}
              <span className={state.qty ? '' : 'warning'}>
                Field is required!
              </span>
            </label>
            <input
              onChange={this.handleChange}
              name="qty"
              type="numbver"
              value={state.qty}
            />
            <button
              className="button"
              type="submit"
              disabled={!!(!state.productName || !state.description)}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(postNewProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
