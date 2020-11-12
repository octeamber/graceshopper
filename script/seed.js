'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

const products = [
  {
    name: 'Creamsicle Mug',
    price: 24,
    description: 'A good coffee mug.',
    qty: 10,
    imageUrl: '../public/images/creamsicle_mug.jpg'
  },
  {
    name: 'Pink Mug',
    price: 20,
    description: 'A small coffee mug.',
    qty: 10,
    imageUrl: '../public/images/pink_mug.jpg'
  },
  {
    name: 'Small Pasta Bowl',
    price: 22,
    description: 'Perfect for pasta.',
    qty: 10,
    imageUrl: '../public/images/small_pasta_bowl.jpg'
  },
  {
    name: 'Salt Jar',
    price: 40,
    description: 'A lidded jar for salt on your counter.',
    qty: 10,
    imageUrl: '../public/images/salt_jar.jpg'
  },
  {
    name: 'Butter jar',
    price: 45,
    description: 'A lidded jar for storing butter.',
    qty: 10,
    imageUrl: '../public/images/butter_jar.jpg'
  },
  {
    name: 'Matcha Cup',
    price: 26,
    description: 'A light weight cup for matcha.',
    qty: 10,
    imageUrl: '../public/images/matcha_cup.jpg'
  },
  {
    name: 'Lipped Cereal Bowl',
    price: 30,
    description: 'A big bowl for cereal.',
    qty: 10,
    imageUrl: '../public/images/large_cereal_bowl.jpg'
  },
  {
    name: 'Low Fish Bowl',
    price: 45,
    description: 'A low serving bowl.',
    qty: 10,
    imageUrl: '../public/images/fish_bowl.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

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
