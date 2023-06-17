import {Router} from 'express'
import {UsersGetController} from '../controllers/users/users-get-controller'
import {UsersPostController} from '../controllers/users/users-post-controller'
import {UsersGetByIdController} from '../controllers/users/users-get-by-id-controller'
import {UsersDeleteByIdController} from '../controllers/users/users-delete-by-id-controller'
import {UsersPutController} from '../controllers/users/users-put-controller'

// Middlewares
import {ValidateCreateUserDtoMiddleware} from '../middlewares/user/validate-create-user-dto-middleware'
import {ValidateUpdateUserDtoMiddleware} from '../middlewares/user/validate-update-user-dto-middleware'

const usersRouter = Router()

// Controllers instances
const usersGetByIdController = new UsersGetByIdController()
const userGetController = new UsersGetController()
const usersPostController = new UsersPostController()
const usersDeleteByIdController = new UsersDeleteByIdController()
const usersPutController = new UsersPutController()

// Middlewares instances
const validateCreateUserDto = new ValidateCreateUserDtoMiddleware()
const validateUpdateUserDto = new ValidateUpdateUserDtoMiddleware()

usersRouter.get('/', userGetController.run.bind(userGetController))
usersRouter.get('/:id', usersGetByIdController.run.bind(usersGetByIdController))
usersRouter.post('/', validateCreateUserDto.run, usersPostController.run.bind(usersPostController))
usersRouter.delete('/:id', usersDeleteByIdController.run.bind(usersDeleteByIdController))
usersRouter.put('/:id', validateUpdateUserDto.run, usersPutController.run.bind(usersPutController))

export default usersRouter
