import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { EmailScalar } from '../../core/scalars/email.scalar';
import { UserController } from './user.controller';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CsvModule
  ],
  providers: [UserService, UserResolver, EmailScalar],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
})
export class UserModule {}
