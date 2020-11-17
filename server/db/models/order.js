const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const Order = db.define('order', {
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    },
    allowNull: false
  }
})


// how do i get req.body here?
Order.findOrderForUser = function(id) {
  return User.findOne({
    where: {
      ordered: false,
      userId: id
    }
  })
}

// find order history for a user
Order.findOrderHistory = function(id) {
  return User.findAll({
    where: {
      ordered: true,
      userId: id
    }
  })
}

// find all orders that are not
// don't need this because guest order will be on local storage?
// this will only find the first one
Order.findGuestOrder = function() {
  return User.findOne({
    where: {
      ordered: false,
      userId: null
    }
  })
}

module.exports = Order
