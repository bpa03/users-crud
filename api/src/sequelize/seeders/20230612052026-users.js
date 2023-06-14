'use strict'
const {faker} = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        id: faker.string.uuid(),
        email: 'test@gmail.com',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70})
      },
      {
        id: faker.string.uuid(),
        email: 'test1@gmail.com',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70})
      },
      {
        id: faker.string.uuid(),
        email: 'test2@gmail.com',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70})
      },
      {
        id: faker.string.uuid(),
        email: 'test3@gmail.com',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70})
      },
      {
        id: faker.string.uuid(),
        email: 'test4@gmail.com',
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70})
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
