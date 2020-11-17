const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//mounted on /api/products

// SECURE ROUTES
// no need to secure these routes?
const forAdminAndUser = (req, res, next) => {
  // console.log('isAdmin?', req.user.isAdmin)
  if (!req.user.isAdmin || (!req.user && req.params.id !== req.user.id)) {
    const err = new Error('FORBIDDEN!')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    console.log(Object.keys(Product.prototype))
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', forAdminAndUser, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})
