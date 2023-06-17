import {faker} from '@faker-js/faker'

export class UsersMother {
  static generateCreateUserDto () {
    return {
      email: faker.internet.email(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({min: 18, max: 70})
    }
  }

  static generateUpdateUserDto () {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({min: 18, max: 70})
    }
  }

  static generateRandomId () {
    return faker.string.uuid()
  }
}
