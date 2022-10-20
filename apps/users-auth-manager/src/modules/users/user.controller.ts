import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CsvParser } from 'nest-csv-parser';
import { UserService } from './user.service';
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

import { RolesGuard } from '../auth/guards/roles.guard';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../core/decorators/roles.decorator';
import { ForgotPswdPayload, UserRoles } from '@vom/common';
import { CurrentUserController } from '../../core/decorators/user.decorator';
import { GrpcMethod } from '@nestjs/microservices';

// @UseGuards(GraphqlAuthGuard)
// @UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly csvParser: CsvParser
  ) {}
  @GrpcMethod('UsersService', 'findById')
  async findById({ id }): Promise<any> {
    console.log('*******************', id);

    // const result: User = await this.service.findById(id)

    // this.logger.info('UsersController#findById.result %o', result)

    // if (isEmpty(result)) throw new Error('Record not found.')

    return { id: '1', name: 'murtaza' };
  }
  @Roles(UserRoles.ADMIN, UserRoles.GROUP_MANAGER)
  @Post('/createUsersFromCSV')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUserController() currentUser: any
  ) {
    try {
      const csvStream = Readable.from(file.buffer);
      const entities = await this.csvParser.parse(
        csvStream,
        Entity,
        null,
        null,
        { separator: ',' }
      );
      return this.userService.createUserFromCSV(
        entities.list,
        currentUser.organization,
        currentUser.groupId
      );
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body() body: any) {
    return await this.userService.forgotPassword(body.email);
  }

  @Get('/reset-password/:id/:token')
  async resetPassword(@Param('id') id: any, @Param('token') token: any) {
    return await this.userService.resetPassword(id, token);
  }

  @Post('/reset-password/:id/:token')
  async resetPasswordUpdate(
    @Param('id') id: any,
    @Param('token') token: any,
    @Body() body: any
  ) {
    if (body.confirmPassword != body.newPassword) {
      throw new HttpException(
        'Confirm Password is not matched',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.userService.resetPasswordUpdate(
        id,
        token,
        body.newPassword
      );
    }
  }
}

class Entity {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  organization: string;
}
