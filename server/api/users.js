const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// SECURE ROUTES
const forAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('This page is only available to admins!')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', forAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
