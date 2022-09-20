import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
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
  createdAt: string;


  @Field()
  @IsNotEmpty()
  users:[CreateUserInput];
}
