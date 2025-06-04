import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(10)
  @IsString()
  password: string;

  @IsString()
  @MinLength(3)
  nombre: string;
}
