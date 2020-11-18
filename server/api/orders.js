const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/orders

// SECURE ROUTES
const forAdminAndUser = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('This page is only available to admins!')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', forAdminAndUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll()

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Add to Cart Route
router.post('/', forAdminAndUser, async (req, res, next) => {
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
