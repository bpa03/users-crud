import {Router} from 'express'
import {UsersGetController} from '../controllers/users/users-get-controller'
import {UsersPostController} from '../controllers/users/users-post-controller'
import {UsersGetByIdController} from '../controllers/users/users-get-by-id-controller'
import {UsersDeleteByIdController} from '../controllers/users/users-delete-by-id-controller'

// Middlewares
import {ValidateCreateUserDtoMiddleware} from '../middlewares/user/validate-create-user-dto-middleware'

const usersRouter = Router()

// Controllers instances
const usersGetByIdController = new UsersGetByIdController()
const userGetController = new UsersGetController()
const usersPostController = new UsersPostController()
const usersDeleteByIdController = new UsersDeleteByIdController()

// Middlewares instances
const validateCreateUserDto = new ValidateCreateUserDtoMiddleware()

usersRouter.get('/', userGetController.run.bind(userGetController))
usersRouter.get('/:id', usersGetByIdController.run.bind(usersGetByIdController))
usersRouter.post('/', validateCreateUserDto.run, usersPostController.run.bind(usersPostController))
usersRouter.delete('/:id', usersDeleteByIdController.run.bind(usersDeleteByIdController))

export default usersRouter
