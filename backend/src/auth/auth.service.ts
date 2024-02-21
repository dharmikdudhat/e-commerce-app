/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Login
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);

    if (user?.password !== password) {
      throw new UnauthorizedException({
        message: 'Please check your credentials',
      });
    }
   /*  if (user?.role !== role && role !== 'admin') {
      throw new UnauthorizedException({
        message: `You don't have permission to perform this action`,
      });
    } */

    const payload = { role: user.role, email: user.email, name: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      isError: false,
      message: "Succes",
      accessToken: token,
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}
