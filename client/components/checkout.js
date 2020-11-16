import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Checkout = props => {
  if (!props.location.state)
    return (
      <>
        <h2>Nothing to see here, but you can shop for some ceramics...</h2>
        <Link to="/products">Check out our products!</Link>
      </>
    )
  const email = props.email
  const orderId = props.location.state.orderId
  return (
    <div>
      <h2>{`Thank you ${email ? email : ''} for your purchase!`}</h2>
      <p>
        {orderId &&
          `We hope you enjoyed your shopping experience.Your confirmation number is ${orderId}`}
      </p>
      <Link to="/home">Go back to our home page</Link>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Checkout)
