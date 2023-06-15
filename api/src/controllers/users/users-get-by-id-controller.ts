import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {userRepository} from '../../repositories'
import {Controller} from '../../interfaces/http/controller'

export class UsersGetByIdController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const {id} = req.params
    const user = await userRepository.findById(id)

    if (user) {
      res.status(httpStatusCodes.OK).json({...user})
    } else {
      res.status(httpStatusCodes.NOT_FOUND).json({message: `user with id ${id} doesn't exist`})
    }
  }
}
