const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/orders

//finds all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//Add to Cart Route
router.post('/', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.user.dataValues.id,
        ordered: false
      }
    })
    //NOTE: find or create returns the order and a boolean value

    const product = await Product.findByPk(req.body.id)
    const price = product.price * req.body.qty

    //magic method addProduct is method on order
    await order.addProduct(product, {
      through: {
        qty: req.body.qty,
        price: price
      }
    })
    res.send('SUCCESS')
  } catch (err) {
    next(err)
  }
})
