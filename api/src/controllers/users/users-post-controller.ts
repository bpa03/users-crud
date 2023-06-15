import {Request, Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {userRepository} from '../../repositories'
import {Controller} from '../../interfaces/http/controller'
import {CreateUserDto} from '../../dtos/user/create-user-dto'

export class UsersPostController implements Controller {
  public async run (req: Request, res: Response) {
    const createUserDto = new CreateUserDto()
    createUserDto.age = req.body.age
    createUserDto.email = req.body.email
    createUserDto.firstname = req.body.firstname
    createUserDto.lastname = req.body.lastname

    const userExists = await userRepository.findByEmail(createUserDto.email)

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
