import {Request, Response, NextFunction} from 'express'
import httpStatusCodes from 'http-status-codes'
import {transformAndValidate} from 'class-transformer-validator'
import {CreateUserDto} from '../../dtos/user/create-user-dto'
import {Middleware} from '../../interfaces/http/middleware'

export class ValidateCreateUserDtoMiddleware implements Middleware {
  public async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await transformAndValidate(CreateUserDto, req.body)
      next()
    } catch (error) {
      res.status(httpStatusCodes.BAD_REQUEST).json({})
    }
  }
}
