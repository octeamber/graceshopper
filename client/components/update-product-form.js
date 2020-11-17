import React from 'react'
import {connect} from 'react-redux'
import {putProduct} from '../store/singleProduct'

export class UpdateProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      price: 0,
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
    const updateProduct = this.props.updateProduct
    updateProduct({
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
            type="submit"
            disabled={!!(!state.productName || !state.description)}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(putProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductForm)
