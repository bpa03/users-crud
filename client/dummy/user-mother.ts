import {faker} from '@faker-js/faker'

export class UserMother {
  static generateCreateUserDto () {
    return {
      email: faker.internet.email(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({min: 20, max: 40})
    }
  }

  static generateUser() {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({min: 20, max: 40})
    }
  }

  static generateMultipleUsers(quantity: number) {
    const users = []
    for (let i = 0; i < quantity; i++) {
      users.push(this.generateUser())
    }
    return users
  }
}
