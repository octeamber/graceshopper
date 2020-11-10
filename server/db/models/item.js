const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://p0.storage.canalblog.com/02/82/119589/127102303.jpg'
  }
})
