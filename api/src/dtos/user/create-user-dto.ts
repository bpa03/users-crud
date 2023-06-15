import {IsEmail, IsNotEmpty, IsNumber} from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, {message: 'Field must be an email'})
  @IsNotEmpty({message: 'Field is required'})
    email!: string

  @IsNotEmpty({message: 'Field is required'})
    firstname!: string

  @IsNotEmpty({message: 'Field is required'})
    lastname!: string

  @IsNumber({allowNaN: false}, {message: 'Field must be a number'})
  @IsNotEmpty({message: 'Field is required'})
    age!: number
}
