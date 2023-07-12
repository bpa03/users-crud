import {rest} from 'msw'
import users from './data/users.json'
import {GetUsersDto} from '../src/features/users/types'

export const userHandlers = [
  rest.get('http://userscrud.api/users', (_req, res, ctx) => {
    return res(ctx.json<GetUsersDto>({users}))
  })
]
