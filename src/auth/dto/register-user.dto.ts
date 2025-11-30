import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}