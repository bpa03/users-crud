import {rest} from 'msw'
import {faker} from '@faker-js/faker'
import users from './data/users.json'
import {CreateUserDto, GetUsersDto, User, UpdateUserDto} from '../src/features/users/types'

export const userHandlers = [
  rest.get('http://userscrud.api/users', (_req, _res, ctx) => {
    return _res(ctx.json<GetUsersDto>({users}))
  }),
  rest.post('http://userscrud.api/users', async (_req, _res, ctx) => {
    const body = await _req.json<Partial<CreateUserDto>>()

    if (!body.email || !body.age || !body.firstname || !body.lastname) {
      return _res(
        ctx.status(400)
      )
    }

    return _res(
      ctx.status(201),
      ctx.set('Content-Type', 'application/json'),
      ctx.json<User>({
      id: faker.string.uuid(),
      age: body.age,
      email: body.email,
      firstname: body.email,
      lastname: body.lastname
    }))
  }),
  rest.put('http://userscrud.api/users/:id', async (_req, _res, ctx) => {
    const body = await _req.json<Partial<UpdateUserDto>>()
    const userId = _req.params.id as string

    if (!body.email || !body.age || !body.firstname || !body.lastname) {
      return _res(
        ctx.status(400)
      )
    }

    return _res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json<User>({
      id: userId,
      age: body.age,
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname
    }))    
  })
]
