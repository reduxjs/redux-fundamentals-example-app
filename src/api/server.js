/* eslint-disable no-unused-vars */

import {
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  association,
  RestSerializer,
} from 'miragejs'

import faker from 'faker'
import { sentence, paragraph, article, setRandom } from 'txtgen'
import { parseISO } from 'date-fns'
import seedrandom from 'seedrandom'

const IdSerializer = RestSerializer.extend({
  serializeIds: 'always',
})

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = true

let rng = seedrandom()

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  rng = seedrandom(randomSeedString)
  setRandom(rng)
  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

new Server({
  routes() {
    this.namespace = 'fakeApi'
    //this.timing = 2000

    this.resource('todos')
    this.resource('lists')

    const server = this
  },
  models: {
    todo: Model.extend({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {},
  serializers: {
    todo: IdSerializer,
    list: IdSerializer,
  },
  seeds(server) {},
})
