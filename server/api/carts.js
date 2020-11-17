const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/carts

// SECURE ROUTES
// protect anyone from seeing the entire db?
// const forAdminAndUser = (req, res, next) => {
//   // console.log('isAdmin?', req.user.isAdmin)
//   if (!req.user.isAdmin || !req.user && req.params.id !== req.user.id) {
//     const err = new Error('This page is only available to admins!')
//     err.status = 401
//     return next(err)
//   }
//   next()
// }

///this is the route for viewing products
router.get('/', async (req, res, next) => {
  try {
    const carts = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id // SOMETIMES GET AN ERROR THAT DATAVALUES DOES NOT EXIST
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
    //find open order for the user
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
    //find order
    //then delete product from that order
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        userId: req.user.dataValues.id
      }
    })
    /*could also probably use magic method foundOrder.removeProduct({
      productId: req.params.productId
    })*/
    console.log('DESTROY ID', req.params.productId)
    await CartData.destroy({
      where: {
        productId: req.params.productId,
        orderId: foundOrder.id
      }
    })
    res.send('SUCCES')
  } catch (err) {
    next(err)
  }
})

/// Update Qty

router.put('/:productId', async (req, res, next) => {
  try {
    //find order
    //then update product from that order
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
