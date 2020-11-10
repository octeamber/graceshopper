/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db/models/cart')
// QUES: i don't understand this next line
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `total price` and `total quantity`', async () => {
      const groCart = await Cart.create({
        totalPrice: 108.99,
        totalQty: 3
      })

      expect(groCart.totalPrice).to.equal(38.99)
      expect(groCart.totalQty).to.equal(3)
    })

    it('`total price` is required', async () => {
      const groCart = Cart.build()
      return groCart.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
