/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login.response.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    try {
      const user = await this.usersService.findOneUser(email);

      if (!user || user.password !== password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        role: user.role,
        email: user.email,
        name: user.username,
      };
      const token = await this.jwtService.signAsync(payload);

      const userResponse = {
        email: user.email,
        username: user.username,
        role: user.role,
        id: user.id,
        token,
      };

      return {
        message: 'Login Successful',
        data: { user: userResponse },
      };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error during sign-in:', error);

      throw new UnauthorizedException(
        'Authentication failed. Please try again later.',
      );
    }
  }
}
