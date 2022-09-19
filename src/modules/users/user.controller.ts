import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CsvParser } from "nest-csv-parser";
import { UserService } from "./user.service";
const fs = require('fs');

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly csvParser: CsvParser) { }

    @Post('/createUsersFromCSV')
    @UseInterceptors(
        FileInterceptor('file' , {
            storage : diskStorage({
                destination : './csvFiles',
            })
        })
        )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        
        const csvStream = fs.createReadStream(file.path);
        const entities = await this.csvParser.parse(csvStream, Entity, null, null, { separator: ',' });
        return this.userService.createUserFromCSV(entities.list);

    }

}

class Entity {
    firstName: any
    lastname: any
    email : any
    password : any
    phone : any
    organization : any
}