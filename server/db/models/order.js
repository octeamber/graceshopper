const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order

// QUES: what instance methods would we want to place here?
