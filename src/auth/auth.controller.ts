import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto){
    return this.authService.registerUser(registerUserDto);
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }
}
