import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

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
  userRole?: string;

  

  @Field()
  @IsString()
  @IsNotEmpty()
  organization: string;


  @Field()
  @IsString()
  @IsNotEmpty()
  groupId:string;
}
