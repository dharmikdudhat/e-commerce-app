/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// // import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import { LoginResponseDto } from './dto/login.response.dto';
// import * as bcrypt from 'bcrypt';
// @Injectable()
// export class AuthService {
//   constructor(
//     // private usersService: UserService,
//     private jwtService: JwtService,
//   ) { }

//   async signIn(email: string, password: string): Promise<LoginResponseDto> {
//     try {
//       // const user = await this.usersService.findOneUser(email);
      
//       return token;

//     } catch (error) {
//       // Log the error for debugging purposes
//       console.error('Error during sign-in:', error);

//       throw new UnauthorizedException(
//         'Authentication failed. Please try again later.',
//       );
//     }
//   }
// }
