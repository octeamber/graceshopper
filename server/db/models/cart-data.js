const Sequelize = require('sequelize')
const db = require('../db')

const CartData = db.define('cartData', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartData
