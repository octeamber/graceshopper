const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

//mounted on /api/orders

router.get('/', async (req, res, next) => {
  try {
    //res.send('HELLO')
    //console.log('THESE ARE THE ORDERS: ', Order)
    console.log('THIS IS REQ.USER:', req.user)
    const orders = await Order.findAll()

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        id: req.user.dataValues.id,
        ordered: false
      }
    })

    const product = await Product.findbyPk(req.body.id)
    const price = product.price * req.body.qty

    const cartProduct = await order.addProduct({
      price: price,
      qty: req.body.qty,
      productId: req.body.id
    })
    res.send('SUCCESS')
  } catch (err) {
    next(err)
  }
})
