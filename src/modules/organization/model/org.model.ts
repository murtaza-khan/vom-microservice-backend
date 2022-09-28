import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { CreateUserInput } from 'src/modules/users/dto/user.input';
import { GroupType } from 'src/modules/groups/model/group.model';

@ObjectType()
export class OrgType {

  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  logo: string;


  @Field()
  @IsString()
  BN: string;

  @Field()
  @IsOptional()
  createdAt: string;


  @Field()
  @IsOptional()
  subscriptionDate: string;

  @Field()
  @IsOptional()
  subscriptionStatus: string;

  @Field()
  @IsOptional()
  groups:[GroupType];

  @Field()
  @IsNotEmpty()
  affiliateId:string;

  @Field()
  @IsOptional()
  admins:[CreateUserInput];

}
