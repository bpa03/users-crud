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
}
