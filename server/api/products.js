const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//mounted on /api/products

router.get('/', async (req, res, next) => {
  try {
    console.log(Object.keys(Product.prototype))
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
