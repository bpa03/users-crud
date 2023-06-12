import {User} from './user'

export abstract class UserRepositoryI {
  public abstract findAll(): Promise<User[]>;
  public abstract create(user: {email: string; age: number; firstname: string; lastname: string}): Promise<User>;
}
