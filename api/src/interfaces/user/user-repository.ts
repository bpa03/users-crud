import {CreateUserDto} from '../../dtos/user/create-user-dto'
import {UpdateUserDto} from '../../dtos/user/update-user-dto'
import {User} from './user'

export abstract class UserRepositoryI {
  public abstract findAll(): Promise<User[]>;
  public abstract create(user: CreateUserDto): Promise<User>;
  public abstract findByEmail(email: string): Promise<User | null>;
  public abstract findById(uuid: string): Promise<User | null>;
  public abstract deleteById(uuid: string): Promise<number>;
  public abstract updateUser(uuid: string, user: UpdateUserDto): Promise<User>;
}
