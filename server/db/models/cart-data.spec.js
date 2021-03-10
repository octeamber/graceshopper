/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const CartData = db.model('cartData')

describe('CartData model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  /*describe('column definitions and validations', () => {
    it('has a `quantity` and `price`', async () => {
      //   const groCart = await CartData.create({
      //     qty: 3,
      //     price: 10899,
      //     // cannot make this because we need associations
      //     // productId: 2,
      //     // orderId: 8
      //   })
      //   expect(groCart.qty).to.equal(3)
      //   expect(groCart.price).to.equal(10899)
    })

    it('`price` is required', async () => {
      const groCart = CartData.build()
      return groCart.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })*/
})
