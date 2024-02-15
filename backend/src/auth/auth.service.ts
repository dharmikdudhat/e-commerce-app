/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  // Login
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);

    if (user?.password !== password) {
      throw new UnauthorizedException({
        message: 'Please check your credentials',
      });
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      isError: "false", message: "Successfully Login", data: {
        username: payload.username,
        accessToken: token
      }
    }
  };
}

