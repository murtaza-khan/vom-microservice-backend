import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserRoles } from '../../../shared/user-roles';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firtName: string;

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
  @IsString()
  @IsNotEmpty()
  userRole?: UserRoles;

  @Field()
  @IsString()
  @IsNotEmpty()
  organization: string;


  @Field()
  @IsString()
  @IsOptional()
  groupId: string;
}
