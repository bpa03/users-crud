import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {userHandlers} from './users'

const server = setupServer(...userHandlers)
export {rest, server}
