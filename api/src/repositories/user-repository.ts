import {User} from '../interfaces/user/user'
import {UserRepositoryI} from '../interfaces/user/user-repository'
import UserModel from '../sequelize/models/user'

export default class UserRepository implements UserRepositoryI {
  constructor (private readonly model: typeof UserModel) {}

  public async findAll (): Promise<User[]> {
    return this.model.findAll()
  }
}
