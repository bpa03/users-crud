/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import {application} from '../server'

beforeAll(async () => {
  await application.listen()
})

afterAll(async () => {
  await application.stop()
})

describe('Users module post controller', () => {
  test('Should responds 400 http status if the body is not sent', (done: CallbackHandler) => {
    supertest(application.getServer).post('/users').expect(400).end(done)
  })

  test('Should responds 201 http status code and the created record', (done: CallbackHandler) => {
    const user = {
      email: 'bpa@test.com',
      firstname: 'Baldassare',
      lastname: 'Pugliese',
      age: 20
    }

    supertest(application.getServer)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).toHaveProperty('id')
        expect(res.body.email).toEqual(user.email)
        expect(res.body.firstname).toEqual(user.firstname)
        expect(res.body.lastname).toEqual(user.lastname)
        expect(res.body.age).toEqual(user.age)
      }).end(done)
  })
})
