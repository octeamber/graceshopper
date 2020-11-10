'use strict'

const db = require('../server/db')
const {User, Item, Cart} = require('../server/db/models')

const items = [
  {
    name: 'Creamsicle Mug',
    price: 24,
    description: 'A good coffee mug.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Pink Mug',
    price: 20,
    description: 'A small coffee mug.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Small Pasta Bowl',
    price: 22,
    description: 'Perfect for pasta.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Salt Jar',
    price: 40,
    description: 'A lidded jar for salt on your counter.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Butter jar',
    price: 45,
    description: 'A lidded jar for storing butter.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Matcha Cup',
    price: 26,
    description: 'A light weight cup for matcha.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Lipped Cereal Bowl',
    price: 30,
    description: 'A big bowl for cereal.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  },
  {
    name: 'Low Chicken Bowl',
    price: 45,
    description: 'A low serving bowl.',
    qty: null,
    imageUrl: '../public/images/placeholder.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    items.map(item => {
      return Item.create(item)
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
