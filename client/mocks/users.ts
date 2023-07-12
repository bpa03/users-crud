import {rest} from 'msw'
import {faker} from '@faker-js/faker'
import users from './data/users.json'
import {CreateUserDto, GetUsersDto, User} from '../src/features/users/types'

export const userHandlers = [
  rest.get('http://userscrud.api/users', (_req, res, ctx) => {
    return res(ctx.json<GetUsersDto>({users}))
  }),
  rest.post('http://userscrud.api/users', async (_req, res, ctx) => {
    const body = await _req.json<Partial<CreateUserDto>>()

    if (!body.email || !body.age || !body.firstname || !body.lastname) {
      return res(
        ctx.status(400)
      )
    }

    return res(
      ctx.status(201),
      ctx.set('Content-Type', 'application/json'),
      ctx.json<User>({
      id: faker.string.uuid(),
      age: body.age,
      email: body.email,
      firstname: body.email,
      lastname: body.lastname
    }))
  })
]
