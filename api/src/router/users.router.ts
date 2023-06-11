import {Router} from 'express'
import {UsersGetController} from '../controllers/users/users-get-controller'
import {UsersPostController} from '../controllers/users/users-post-controller'

const usersRouter = Router()

// Controllers instances
const userGetController = new UsersGetController()
const usersPostController = new UsersPostController()

usersRouter.get('/', userGetController.run.bind(userGetController))
usersRouter.post('/', usersPostController.run.bind(usersPostController))

export default usersRouter
