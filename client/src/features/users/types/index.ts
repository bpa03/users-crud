export interface User {
  id: string;
  email: string;
  age: number;
  firstname: string;
  lastname: string;
}

export interface GetUsersDto {
  users: ListOfUsers;
}

export interface CreateUserDto {
  email: string;
  age: number;
  firstname: string;
  lastname: string;
}

export interface UpdateUserDto {
  email: string;
  age: number;
  firstname: string;
  lastname: string;
}

export type ListOfUsers = Array<User>;
