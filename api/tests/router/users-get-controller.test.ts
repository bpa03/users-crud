/* eslint-disable no-undef */
import supertest, {CallbackHandler} from 'supertest'
import app from '../../src/main'

describe('Users module get controller', () => {
  test('Should responds 200 http status code', (done: CallbackHandler) => {
    supertest(app).get('/users').expect(200).end(done)
  })
})
