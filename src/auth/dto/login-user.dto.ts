import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(5)
  @MaxLength(10)
  @IsString()
  password: string;
}
