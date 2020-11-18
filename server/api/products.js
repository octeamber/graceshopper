const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//mounted on /api/products

// SECURE ROUTES
const forAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('This page is only available to admins!')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
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

router.post('/', forAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.json(deletedProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId)
    const updatedProduct = await foundProduct.update(req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
