import {User} from '../interfaces/user/user'
import {UserRepositoryI} from '../interfaces/user/user-repository'
import {CreateUserDto} from '../dtos/user/create-user-dto'
import UserModel from '../sequelize/models/user'

export default class UserRepository implements UserRepositoryI {
  constructor (private readonly model: typeof UserModel) {}

  public async findAll (): Promise<User[]> {
    return this.model.findAll()
  }

  public async create (user: CreateUserDto): Promise<User> {
    const newUser = await UserModel.create(user)
    return newUser.toJSON()
  }

  public async findByEmail (email: string) {
    return UserModel.findOne({where: {email}})
  }
}
