/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import {application} from '../server'

beforeAll(async () => {
  await application.listen()
})

afterAll(async () => {
  await application.stop()
})

describe('Users module get controller', () => {
  test('Should responds 200 http status code', (done: CallbackHandler) => {
    supertest(application.getServer).get('/users').expect(200).end(done)
  })

  test('should responds an array of existing records', (done: CallbackHandler) => {
    supertest(application.getServer).get('/users').expect(function (res) {
      expect(Array.isArray(res.body.users)).toBeTruthy()
    }).end(done)
  })
})
