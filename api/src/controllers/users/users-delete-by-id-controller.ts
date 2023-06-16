import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {userRepository} from '../../repositories'
import {Controller} from '../../interfaces/http/controller'

export class UsersDeleteByIdController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const {id} = req.params
    const wasRemoved = await userRepository.deleteById(id)

    if (wasRemoved) {
      res.status(httpStatusCodes.NO_CONTENT).send()
    } else {
      res.status(httpStatusCodes.NOT_FOUND).json({
        message: `User with id ${id} doesn't exist`
      })
    }
  }
}
