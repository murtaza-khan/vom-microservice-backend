import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { CreateUserInput } from 'src/modules/users/dto/user.input';

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
  users:[CreateUserInput];
}
