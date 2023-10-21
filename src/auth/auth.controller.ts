import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/config/handlers/response-message';

import { UserSignInDto } from './dto/auth/user-signin.dto';
import { UserSignUpDto } from './dto/auth/user-signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user_signup')
  @ResponseMessage('New system user has been successfully created.')
  systemUserSignUp(@Body() systemUser: UserSignUpDto) {
    return this.authService.userSignUp(systemUser);
  }

  @Post('user_signin')
  @ResponseMessage('success')
  systemUserSignIn(@Body() systemUser: UserSignInDto) {
    return this.authService.userSignIn(systemUser);
  }
}
