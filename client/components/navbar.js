import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, productCount}) => (
  <div>
    <div id="header">
      <div className="logo">
        <Link to="/">
          <h1>Grace Potter</h1>
        </Link>
      </div>
      <div className="links">
        <Link to="/products">
          <h3>All Products</h3>
        </Link>
        <Link to="/cart">
          <h3>Cart({productCount})</h3>
        </Link>
      </div>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('map state in navbar', state)
  return {
    isLoggedIn: !!state.user.id,
    productCount: state.cart.reduce((accum, currVal) => {
      accum += currVal.orderQty
      return accum
    }, 0)
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
