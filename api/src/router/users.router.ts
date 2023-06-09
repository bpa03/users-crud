import {Router} from 'express'
import {UserGetController} from '../controllers/users/users-get-controller'

const usersRouter = Router()

// Controllers instances
const userGetController = new UserGetController()

usersRouter.get('/', userGetController.run.bind(userGetController))

export default usersRouter
