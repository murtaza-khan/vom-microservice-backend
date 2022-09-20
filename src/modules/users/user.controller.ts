import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CsvParser } from "nest-csv-parser";
import { UserService } from "./user.service";
import { Readable } from 'stream'
const fs = require('fs');

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly csvParser: CsvParser) { }

    @Post('/createUsersFromCSV')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try{
            const csvStream = Readable.from(file.buffer);
            const entities = await this.csvParser.parse(csvStream, Entity, null, null, { separator: ',' });
            return this.userService.createUserFromCSV(entities.list);
        } catch(error) {
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