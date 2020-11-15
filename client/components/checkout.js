import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Checkout = props => {
  // const {id, email, cart} = props
  const id = 3
  // const email = ''
  const email = 'cody@gmail.com'
  // const cart = [5]
  return (
    <div>
      <h2>
        {id
          ? `Thank you ${email ? email : ''} for your purchase!`
          : `Your cart is empty, there's nothing to checkout`}
      </h2>
      <p>
        {id &&
          `We hope you enjoyed your shopping experience.Your confirmation number is ${id}`}
      </p>
      <Link to="/home">Go back to our home page</Link>
    </div>
  )
}

const mapState = state => {
  return {
    id: state.cart.orderId,
    email: state.user.email,
    cart: state.cart.products
  }
}

export default connect(mapState)(Checkout)
