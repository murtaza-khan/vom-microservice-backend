import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CsvParser } from "nest-csv-parser";
import { UserService } from "./user.service";
import { Readable } from 'stream'
import { RolesGuard } from '../auth/guards/roles.guard';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoles } from '@vom/common';
import { CurrentUserController } from '../../core/decorators/user.decorator';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly csvParser: CsvParser) { }

    @Roles(UserRoles.ADMIN, UserRoles.GROUP_MANAGER)
    @Post('/createUsersFromCSV')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @CurrentUserController() currentUser: any) {
        try {
            const csvStream = Readable.from(file.buffer);
            const entities = await this.csvParser.parse(csvStream, Entity, null, null, { separator: ',' });
            return this.userService.createUserFromCSV(entities.list, currentUser.organization, currentUser.groupId);
        } catch (error) {
            throw Error(error);
        }
    }

}

class Entity {
    firstName: string
    lastname: string
    email: string
    password: string
    phone: string
    organization: string
}