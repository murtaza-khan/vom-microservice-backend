import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { EmailScalar } from '../../core/scalars/email.scalar';
import { UserController } from './user.controller';
import { CsvModule } from 'nest-csv-parser';
import { GroupsModule } from '../groups/groups.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CsvModule,
    forwardRef(() => GroupsModule),
    forwardRef(() => OrganizationModule)
  ],
  providers: [UserService, UserResolver, EmailScalar ],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
})
export class UserModule {}
