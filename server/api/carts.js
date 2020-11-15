const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/carts

router.get('/', async (req, res, next) => {
  try {
    console.log(Object.keys(Order.prototype))
    const carts = await Order.findOne({
      where: {
        ordered: false,
        id: req.user.dataValues.id
      },
      include: [Product]
    })
    res.json(carts)
    console.log('THIS IS THE CART:', carts)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    //find open order for the user
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        id: req.user.dataValues.id
      }
    })
    const updatedOrder = await foundOrder.update({ordered: true})
    res.json(updatedOrder)
    res.send(req.body.id)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    //find order
    //then delete product from that order
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        id: req.user.dataValues.id
      }
    })
    /*could also probably use magic method foundOrder.removeProduct({
      productId: req.params.productId
    })*/
    const deletedProduct = await CartData.destroy({
      where: {
        productId: req.params.productId,
        orderId: foundOrder.id
      }
    })
    res.json(deletedProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    //find order
    //then update product from that order
    const foundOrder = await Order.findOne({
      where: {
        ordered: false,
        id: req.user.dataValues.id
      }
    })

    const foundProduct = await CartData.findOne({
      where: {
        productId: req.params.productId,
        orderId: foundOrder.id
      }
    })
    const product = await Product.findbyPk(req.params.productId)
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
