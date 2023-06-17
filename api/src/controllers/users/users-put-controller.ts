import {Request, Response} from 'express'
import {userRepository} from '../../repositories'
import {UpdateUserDto} from '../../dtos/user/update-user-dto'
import {Controller} from '../../interfaces/http/controller'

export class UsersPutController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const {id} = req.params
    const user = await userRepository.findById(id)

    if (!user) {
      res.status(400).json({message: `User with id ${id} doesn't exist`})
    } else {
      const updateUserDto = new UpdateUserDto()
      updateUserDto.age = req.body.age
      updateUserDto.firstname = req.body.firstname
      updateUserDto.lastname = req.body.lastname

      const updatedUser = await userRepository.updateUser(id, updateUserDto)
      res.status(200).json(updatedUser)
    }
  }
}
