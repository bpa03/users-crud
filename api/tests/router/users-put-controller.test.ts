/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import {application} from '../server'
import {UsersMother} from '../dummy/users-mother'
import {userRepository} from '../../src/repositories'
import {User} from '../../src/interfaces/user/user'

let user: User

beforeAll(async () => {
  user = await userRepository.create(UsersMother.generateCreateUserDto())
  await application.listen()
})

afterAll(async () => {
  await application.stop()
})

describe('Users put controller', () => {
  test('Should responds 400 status code if update user dto is not sent', (done: CallbackHandler) => {
    const randomUUID = UsersMother.generateRandomId()

    supertest(application.getServer)
      .put(`/users/${randomUUID}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(done)
  })

  test('Should responds 400 if one of the required fields is missing', (done: CallbackHandler) => {
    const randomUUID = UsersMother.generateRandomId()
    const userUpdate = UsersMother.generateUpdateUserDto()
    userUpdate.firstname = ''

    supertest(application.getServer)
      .put(`/users/${randomUUID}`)
      .send(userUpdate)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(done)
  })

  test('Should responds 200 and update an with the given id and dto', (done: CallbackHandler) => {
    const userUpdate = UsersMother.generateUpdateUserDto()

    supertest(application.getServer)
      .put(`/users/${user.id}`)
      .send(userUpdate)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.firstname).toEqual(userUpdate.firstname)
        expect(res.body.lastname).toEqual(userUpdate.lastname)
        expect(res.body.age).toEqual(userUpdate.age)
      })
      .end(done)
  })
})
