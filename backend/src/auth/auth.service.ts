/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/auth-login.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Login
  async signIn(email: string, password: string): Promise<LoginUserDto> {
    const user = await this.usersService.findOneUser(email);
console.log(user)
    if (user?.password !== password) {
      throw new UnauthorizedException({
        message: 'Please check your credentials',
      });
    }
    const payload = { sub: user.id, username: user.username };
    return {
      isError: false,
      message: 'Login Successful',
      data: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
