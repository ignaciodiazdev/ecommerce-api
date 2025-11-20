import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string

  @IsOptional()
  @IsString()
  @Length(7, 9)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  address?: string;
}