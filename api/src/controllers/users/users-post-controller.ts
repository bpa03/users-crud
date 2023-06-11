import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {userRepository} from '../../repositories'
import {Controller} from '../../interfaces/http/controller'

export class UsersPostController implements Controller {
  public async run (req: Request, res: Response) {
    if (!req.body.email || !req.body.age || !req.body.firstname || !req.body.lastname) {
      res.status(httpStatusCodes.BAD_REQUEST).json({})
      return
    }

    res.status(httpStatusCodes.CREATED).json({
      id: 'custom id from database',
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age
    })
  }
}
