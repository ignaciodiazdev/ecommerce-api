import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ){}

  async registerUser(registerUserDto: RegisterUserDto){
    const { name, email, password } = registerUserDto;

    const userExists = await this.usersService.existsByEmail(email);   
    if(userExists) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashingService.hashPassword(password);

    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword
    });

    return this.buildResponse(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto){
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email);
    if(!user) throw new UnauthorizedException('Invalid Credentials');

    const isMatch = await this.hashingService.comparePassword(password, user.password);
    if(!isMatch) throw new UnauthorizedException('Invalid Credentials');

    return this.buildResponse(user);
  }

  private async buildResponse(user: any){
    const payload = {
      sub: user.id,
      email: user.id,
      role: user.role,
    }
    
    return { 
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }
}
