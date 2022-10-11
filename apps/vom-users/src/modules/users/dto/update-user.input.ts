import { Args } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, IsOptional, isString } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserRoles } from '../../../shared/user-roles';

@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  @IsOptional()
  // @Args('firstName')
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  // @Args('lastName')
  lastName?: string;

  
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  // @Args('email')
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  // @Args('password')
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  // @Args('phone')
  phone?: string;
  
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  userRole?: UserRoles;

  @Field({ nullable: true })
  @IsOptional()
  // @Args('organization')
  organization?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  groupId?: string
}