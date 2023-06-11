import {User} from './user'

export abstract class UserRepositoryI {
  public abstract findAll(): Promise<User[]>;
}
