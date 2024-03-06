/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prettier/prettier */

// import {
//     Body,
//     Controller,
//     Get,
//     HttpCode,
//     HttpStatus,
//     Post,
//     Request,
//     UseGuards
//   } from '@nestjs/common';
//   import { AuthGuard } from './auth.guards';
//   import { AuthService } from './auth.service';
// import { LoginResponseDto, SignInDto } from './dto/login.response.dto';
// // import { RoleGuard } from 'src/user/role.gua?rd';

  
//   @Controller('auth')
//   export class AuthController {
//     constructor(private authService: AuthService) {}
  
   
  
//     // @Get("/Admin")
//     // @UseGuards( AuthGuard('jwt'), new RoleGuard('ADMIN'))
//     // androidDeveloperData(@Request() req): string {
//     //   return "this is private data for ADMIN" ;
//     // }
  
//     // @Get("/web-developer")
//     // @UseGuards( AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
//     // webDeveloperData(@Request() req): string {
//     //   return "this is private data for web developer" + JSON.stringify(req.user);
//     // }
//   }