const router = require('express').Router()
const {Order, Product, CartData} = require('../db/models')
module.exports = router

//mounted on /api/orders

router.get('/', async (req, res, next) => {
  try {
    //res.send('HELLO')
    //console.log('THESE ARE THE ORDERS: ', Order)
    // console.log('THIS IS REQ.USER:', req.user)
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
        userId: req.user.dataValues.id,
        ordered: false
      }
    })

    console.log('ORDER', order)
    const product = await Product.findByPk(req.body.id)
    const price = product.price * req.body.qty

    // console.log('ORDER MAGIC METHODS', Object.keys(Order.prototype))
    // ORDER MAGIC METHODS [
    //   '_customGetters',    '_customSetters',
    //   'validators',        '_hasCustomGetters',
    //   '_hasCustomSetters', 'rawAttributes',
    //   '_isAttribute',      'getProducts',
    //   'countProducts',     'hasProduct',
    //   'hasProducts',       'setProducts',
    //   'addProduct',        'addProducts',
    //   'removeProduct',     'removeProducts',
    //   'createProduct'
    // ]

    // this works
    await CartData.create({
      price: price,
      qty: req.body.qty,
      productId: req.body.id,
      orderId: req.user.dataValues.id
    })

    // await order.addProduct({
    //   price: price,
    //   qty: req.body.qty,
    //   productId: req.body.id
    // })

    // console.log('PRODUCT POST ORDER', product)
    // console.log('POST ORDER', order.getProduct())
    // res.send('SUCCESS')
  } catch (err) {
    next(err)
  }
})
