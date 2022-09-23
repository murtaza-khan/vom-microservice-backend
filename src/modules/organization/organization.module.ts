import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgSchema } from './organization.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Organization' , schema: OrgSchema}])
  ],
  exports :[
    MongooseModule.forFeature([{ name: 'Organization' , schema: OrgSchema}])

  ],
  providers: [OrganizationResolver, OrganizationService]
})
export class OrganizationModule {}
