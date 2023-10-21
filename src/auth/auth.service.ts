import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { Helpers } from 'src/utilities/helpers';

import { UserSignInDto } from './dto/auth/user-signin.dto';
import { UserSignUpDto } from './dto/auth/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // User
  async userSignUp(systemUser: UserSignUpDto): Promise<any> {
    systemUser.password = await Helpers.hashPassword(systemUser.password);

    const createdUser = await this.prisma.user.create({
      data: systemUser,
    });

    delete createdUser.password;

    const currentTime = Math.floor(Date.now() / 1000);

    const payload = {
      sub: createdUser.id,
      username: createdUser.username,
      iat: currentTime,
      exp: currentTime + jwtConstants.expiresInSecond,
    };

    return {
      userInfo: createdUser,
      issuedAt: currentTime,
      expiresIn: this.getExpiredTime(payload.exp),
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async userSignIn(systemUser: UserSignInDto) {
    const { username, password } = systemUser;

    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credential not found');
    }

    delete user.password;

    const currentTime = Math.floor(Date.now() / 1000);

    const payload = {
      sub: user.id,
      username: user.username,
      iat: currentTime,
      exp: currentTime + jwtConstants.expiresInSecond,
    };

    return {
      userInfo: user,
      issuedAt: currentTime,
      expiresIn: this.getExpiredTime(payload.exp),
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  // Common
  private getExpiredTime(expirationTime: number): number {
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime - currentTime;
  }
}
