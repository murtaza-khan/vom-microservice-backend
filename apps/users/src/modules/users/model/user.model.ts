import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRoles } from '@vom/common';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;


  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsOptional()
  userRole: UserRoles;

  @Field()
  @IsString()
  @IsNotEmpty()
  organization: string;

  @Field()
  @IsString()
  @IsOptional()
  groupId:string;
}
