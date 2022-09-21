import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { GroupSchema } from './groups.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    forwardRef(() => UserModule)
  ],
  providers: [GroupsResolver, GroupsService],
  exports:[
    GroupsService,
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),]
})
export class GroupsModule {}
