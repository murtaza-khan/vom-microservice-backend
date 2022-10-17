import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { CreateUserInput } from '../../../modules/users/dto/user.input';

@ObjectType()
export class GroupType {

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
  managerId: string;

  @Field()
  @IsOptional()
  createdAt: string;

  @Field()
  @IsOptional()
  manager: CreateUserInput;

  @Field()
  @IsOptional()
  users: [CreateUserInput];
}
