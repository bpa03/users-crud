import {IsNotEmpty, IsNumber} from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty({message: 'Field is required'})
    firstname!: string

  @IsNotEmpty({message: 'Field is required'})
    lastname!: string

  @IsNumber({allowNaN: false}, {message: 'Field must be a number'})
  @IsNotEmpty({message: 'Field is required'})
    age!: number
}
