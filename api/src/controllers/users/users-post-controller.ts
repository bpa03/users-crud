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

    const userExists = await userRepository.findByEmail(req.body.email)

    if (userExists) {
      res.status(400).json({detail: 'User exists on database'})
      return
    }

    try {
      const newUser = await userRepository.create(req.body)
      res.status(httpStatusCodes.CREATED).json(newUser)
    } catch (e) {
      console.log(e)
    }
  }
}
