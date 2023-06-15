import {Request, Response, NextFunction} from 'express'
import {validate} from 'class-validator'
import httpStatusCodes from 'http-status-codes'
import {CreateUserDto} from '../../dtos/user/create-user-dto'
import {Middleware} from '../../interfaces/http/middleware'

export class ValidateCreateUserDtoMiddleware implements Middleware {
  public async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    const createUserDto = new CreateUserDto()
    createUserDto.age = req.body.age
    createUserDto.email = req.body.email
    createUserDto.firstname = req.body.firstname
    createUserDto.lastname = req.body.lastname

    const errors = await validate(createUserDto)

    if (errors.length) {
      const mappedErrors = errors.map(({property, constraints}) => ({
        property,
        constraints
      }))
      res.status(httpStatusCodes.BAD_REQUEST).json({errors: mappedErrors})
    } else {
      next()
    }
  }
}
