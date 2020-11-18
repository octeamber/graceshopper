const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/carts

// SECURE ROUTES
const forAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('This page is only available to admins!')
    err.status = 401
    return next(err)
  }
  next()
}

///this is the route for viewing products
router.get('/', forAdmin, async (req, res, next) => {
  try {
    const carts = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id
      },
      include: [Product]
    })
    const response = carts ? carts.products : []
    res.json(response)
  } catch (err) {
    next(err)
  }
})

//// This is the route for the checkout

router.put('/', async (req, res, next) => {
  try {
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id
      }
    })
    const updatedOrder = await foundOrder.update({ordered: true})
    res.json(updatedOrder)
    res.send(req.body.id)
  } catch (err) {
    next(err)
  }
})

// Delete Route
router.delete('/:productId', async (req, res, next) => {
  try {
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id
      }
    })

    await CartData.destroy({
      where: {
        productId: req.params.productId,
        orderId: foundOrder.id
      }
    })
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

/// Update Qty

router.put('/:productId', async (req, res, next) => {
  try {
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id
      }
    })

    const foundProduct = await CartData.findOne({
      where: {
        productId: req.params.productId,
        orderId: foundOrder.id
      }
    })
    const product = await Product.findByPk(req.params.productId)
    const price = product.price * req.body.qty

    const updatedProduct = await foundProduct.update({
      qty: req.body.qty,
      price: price
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
