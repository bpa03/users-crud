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
    const newUser = await this.model.create(user)
    return newUser.toJSON()
  }

  public async findByEmail (email: string): Promise<User | null> {
    const user = await this.model.findOne({where: {email}})
    return user === null ? null : user.toJSON()
  }

  public async findById (uuid: string): Promise<User | null> {
    const user = await this.model.findOne({where: {id: uuid}})
    return user === null ? null : user.toJSON()
  }

  public async deleteById (uuid: string): Promise<number> {
    return await this.model.destroy({where: {id: uuid}})
  }
}
