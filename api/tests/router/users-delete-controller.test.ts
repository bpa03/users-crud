/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import {userRepository} from '../../src/repositories'
import {User} from '../../src/interfaces/user/user'
import {application} from '../server'
import {UsersMother} from '../dummy/users-mother'

let user: User

beforeAll(async () => {
  user = await userRepository.create(UsersMother.generateCreateUserDto())
  await application.listen()
})

afterAll(async () => {
  await application.stop()
})

describe('User modules delete by id controller', () => {
  test('Should responds 400 http status code if sent pass an non-existing user\'s id', (done: CallbackHandler) => {
    const randomUUID = UsersMother.generateRandomId()

    supertest(application.getServer)
      .delete(`/users/${randomUUID}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done)
  })

  test('Should responds 204 http status code an delete the existing user', (done: CallbackHandler) => {
    supertest(application.getServer)
      .delete(`/users/${user.id}`)
      .expect(204)
      .end(done)
  })
})
