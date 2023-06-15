/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import {UsersMother} from '../dummy/users-mother'
import {application} from '../server'
import {User} from '../../src/interfaces/user/user'
import {userRepository} from '../../src/repositories'

let user: User

beforeAll(async () => {
  user = await userRepository.create(UsersMother.generateCreateUserDto())
  await application.listen()
})

afterAll(async () => {
  await application.stop()
})

describe('User modules get by id controller', () => {
  test('Should responds 404 http status code if try access a non-existent user', (done: CallbackHandler) => {
    const randomUUID = UsersMother.generateRandomId()
    supertest(application.getServer).get(`/users/${randomUUID}`)
      .expect(404)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('message')
      })
      .end(done)
  })

  test('Should responds 200 http status code an an user record if pass an existing user\'s id', (done: CallbackHandler) => {
    supertest(application.getServer).get(`/users/${user.id}`).expect(200).expect('Content-Type', /json/).end(done)
  })
})
