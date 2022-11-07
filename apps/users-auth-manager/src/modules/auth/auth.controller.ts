import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CsvParser } from 'nest-csv-parser';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Readable } from 'stream';
import { sign, verify } from 'jsonwebtoken';

import { RolesGuard } from './guards/roles.guard';
import { GraphqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../core/decorators/roles.decorator';
import { ForgotPswdPayload, Payload, User, UserRoles } from '@vom/common';
import { CurrentUserController } from '../../core/decorators/user.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

// @UseGuards(GraphqlAuthGuard)
// @UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  @GrpcMethod('UsersService', 'login')
  async login(data: any) {
    const response: User = await this.userService.findByLogin(data);

  
    return response;
  }
  @GrpcMethod('UsersService', 'create')
  async signup(user: any) {
    user.userRole = UserRoles.EMPLOYEE;

    try {
      const response: any = await this.userService.create(user);
      const payload: Payload = {
        email: response.email,
        role: response.userRole,
        organization: response.organization,
      };

      const token = await this.authService.signPayload(payload);
      return { accessToken: token };
    } catch (exception) {
      throw { error: exception.response, status: exception.status };
    }
  }
}
