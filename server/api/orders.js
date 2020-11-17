const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/orders

// SECURE ROUTES
// protect if the user is not an admin or the userId  does not equal what??
const forAdminAndUser = (req, res, next) => {
  // console.log('isAdmin?', req.user.isAdmin)
  if (!req.user.isAdmin || (!req.user && req.params.id !== req.user.id)) {
    const err = new Error('This page is only available to admins!')
    err.status = 401
    return next(err)
  }
  next()
}

// Gets Products but we don't use it
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
