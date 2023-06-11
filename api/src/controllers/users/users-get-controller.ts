import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {userRepository} from '../../repositories'
import {Controller} from '../../interfaces/http/controller'

export class UserGetController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const users = await userRepository.findAll()
    res.status(httpStatusCodes.OK).json({users})
  }
}
