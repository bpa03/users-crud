export interface User {
  id: string;
  email: string;
  age: number;
  firstname: string;
  lastname: string;
}

export interface CreateUserDto {
  email: string;
  age: number;
  firstname: string;
  lastname: string;
}

export type ListOfUsers = Array<User>;
