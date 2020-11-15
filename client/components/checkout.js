import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Checkout = props => {
  const {id, email} = props
  // const id = 2
  // const email = ''
  return (
    <div>
      <h2> {`Thank you ${email ? email : ''} for your purchase!`}</h2>
      <p>
        {id
          ? `We hope you enjoyed your shopping experience.Your confirmation number is ${id}`
          : `Your cart is empty, there's nothing to checkout`}
      </p>
      <Link to="/home">Go back to our home page</Link>
    </div>
  )
}

const mapState = state => {
  return {
    id: state.cart.orderId,
    email: state.user.email
  }
}

export default connect(mapState)(Checkout)
