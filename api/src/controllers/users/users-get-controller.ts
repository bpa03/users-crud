import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {Controller} from '../../interfaces/http/controller'

export class UserGetController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    res.status(httpStatusCodes.OK).json({users: []})
  }
}
