import {Router} from 'express'
import {UsersGetController} from '../controllers/users/users-get-controller'
import {UsersPostController} from '../controllers/users/users-post-controller'

// Middlewares
import {ValidateCreateUserDtoMiddleware} from '../middlewares/user/validate-create-user-dto-middleware'

const usersRouter = Router()

// Controllers instances
const userGetController = new UsersGetController()
const usersPostController = new UsersPostController()

// Middlewares instances
const validateCreateUserDto = new ValidateCreateUserDtoMiddleware()

usersRouter.get('/', userGetController.run.bind(userGetController))
usersRouter.post('/', validateCreateUserDto.run, usersPostController.run.bind(usersPostController))

export default usersRouter
