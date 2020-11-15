'use strict'

const db = require('../server/db')
const {User, Product, Order, CartData} = require('../server/db/models')

/*const cartdata = [
  {
    qty: 3
  },
  {
    productId: 3
  }, 
  {
    orderId: 2
  }
]*/

const orders = [
  {
    ordered: false,
    userId: 1
  },
  {
    ordered: true,
    userId: 1
  },
  {
    ordered: false,
    userId: 2
  }
]

const products = [
  {
    name: 'Creamsicle Mug',
    price: 2400,
    description: 'A good coffee mug.',
    qty: 10,
    imageUrl: '../images/creamsicle_mug.jpg'
  },
  {
    name: 'Pink Mug',
    price: 2000,
    description: 'A small coffee mug.',
    qty: 10,
    imageUrl: '../images/pink_mug.jpg'
  },
  {
    name: 'Small Pasta Bowl',
    price: 2200,
    description: 'Perfect for pasta.',
    qty: 10,
    imageUrl: '../images/small_pasta_bowl.jpg'
  },
  {
    name: 'Salt Jar',
    price: 4000,
    description: 'A lidded jar for salt on your counter.',
    qty: 10,
    imageUrl: '../images/salt_jar.jpg'
  },
  {
    name: 'Butter jar',
    price: 4500,
    description: 'A lidded jar for storing butter.',
    qty: 10,
    imageUrl: '../images/butter_jar.jpg'
  },
  {
    name: 'Matcha Cup',
    price: 2650,
    description: 'A light weight cup for matcha.',
    qty: 10,
    imageUrl: '../images/matcha_cup.jpg'
  },
  {
    name: 'Lipped Cereal Bowl',
    price: 3099,
    description: 'A big bowl for cereal.',
    qty: 10,
    imageUrl: '../images/large_cereal_bowl.jpg'
  },
  {
    name: 'Low Fish Bowl',
    price: 4555,
    description: 'A low serving bowl.',
    qty: 10,
    imageUrl: '../images/fish_bowl.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  /*const cartdata = await Promise.all([
    CartData.create({qty: 3, price: 30})
  ])*/

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  /*await Promise.all(
    cartdata.map(cartdata => {
      return CartData.create(cartdata)
    })
  )*/

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
