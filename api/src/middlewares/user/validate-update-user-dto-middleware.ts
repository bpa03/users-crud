import {Request, Response, NextFunction} from 'express'
import {validate} from 'class-validator'
import httpStatusCodes from 'http-status-codes'
import {UpdateUserDto} from '../../dtos/user/update-user-dto'
import {Middleware} from '../../interfaces/http/middleware'

export class ValidateUpdateUserDtoMiddleware implements Middleware {
  public async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    const createUserDto = new UpdateUserDto()
    createUserDto.age = req.body.age
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
