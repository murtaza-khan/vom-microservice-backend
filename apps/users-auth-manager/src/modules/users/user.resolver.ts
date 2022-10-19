import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards, UnauthorizedException, SetMetadata, Inject, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../../core/decorators/user.decorator';
import { User , UserRoles, validRole} from '@vom/common';
import { UserType } from './model/user.model';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ) { }

  // @Roles("super")

  @Query(returns => UserType)
  async getUser(@Args('userId') userId: any, @CurrentUser() currentUser: any) {
    console.log("userId", userId);
    if(userId){
      return await this.userService.getSingleUser(userId);
    }
    else{
      return await this.userService.getUsers(currentUser);
    }
  }

  @Query(returns => UserType)
  async getManagersByOrgID(@CurrentUser() currentUser: any){
    if(currentUser.userRole == UserRoles.ADMIN){
      return await this.userService.getManagersByOrgID(currentUser.organization);
    }
    else{
      throw new HttpException(`${currentUser.userRole} can't get managers` , HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(returns => UserType)
  async createUser(@Args('createUser') createUser: any, @CurrentUser() currentUser: any) {
    if (createUser.userRole == undefined) {
      createUser.userRole = UserRoles.EMPLOYEE;
    }
    const validateTole = await validRole(currentUser.userRole, createUser.userRole);
    if (validateTole) {
      if(createUser.userRole === UserRoles.ADMIN && !createUser.organization){
        throw new HttpException(`Orgnization Id is required for Admin`, HttpStatus.BAD_REQUEST);
      }
      if(currentUser.userRole === UserRoles.ADMIN || currentUser.userRole === UserRoles.GROUP_MANAGER){
        createUser.organization = currentUser.organization;
      }
      const response = await this.userService.create(createUser);
      return response;
    }
    else {
      throw new HttpException(`${currentUser.userRole} can't create ${createUser.userRole}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(returns => UserType)
  async editUser(
    @Args('id') id: string,
    @Args('user') user: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    const isUser = await this.userService.getUsersByUserId(id);
    if(isUser != null){
      const validateTole = await validRole(currentUser.userRole, isUser.userRole);
      if(id === currentUser.id || validateTole){
        return await this.userService.update(id, user, currentUser);
      }
      else{
        throw new UnauthorizedException();
      }
    }
    else {
      throw new BadRequestException();
    }
    return;
    if (id === currentUser.id || currentUser.userRole === UserRoles.ADMIN) {
      return await this.userService.update(id, user, currentUser.userRole);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(returns => UserType)
  async deleteUserByEmail(@Args('email') email: string,
    @CurrentUser() currentUser: User) {
    const user = await this.userService.getUsersByUserEmail(email);
    if (user != null) {
      const validateTole = await validRole(currentUser.userRole, user.userRole);
      if (validateTole) {
        if(email == currentUser.email){
          throw new HttpException(`You Can't delete Yourself`, HttpStatus.BAD_REQUEST);
        }
        return await this.userService.deleteUserByEmail(email);
      }
      else {
        throw new HttpException(`${currentUser.userRole} can't delete ${user.userRole}`, HttpStatus.BAD_REQUEST);
      }
    }
    else {
      return user;
    }

  }

  @Mutation(returns => UserType)
  async deleteUserById(@Args("userId") userId: string,
    @CurrentUser() currentUser: User) {
    const user = await this.userService.getUsersByUserId(userId);
    const validateTole = await validRole(currentUser.userRole, user.userRole);
    if (user != null) {
      if (validateTole) {
        if(userId == currentUser.id){
          throw new HttpException(`You Can't delete Yourself`, HttpStatus.BAD_REQUEST);
        }
        return await this.userService.deleteUserById(userId);
      }
      else {
        throw new HttpException(`${currentUser.userRole} can't delete ${user.userRole}`, HttpStatus.BAD_REQUEST);
      }
    }
    else {
      return user;
    }
  }

  @Mutation(returns => UserType)
  async getUsersByOrgId(@Args('orgId') orgId: string) {
    return await this.userService.getUsersByOrgId(orgId);
  }

  @Mutation(returns => UserType)
  async getUsersByGroupId(@Args('groupId') groupId: string) {
    return await this.userService.getUsersByGroupId(groupId);
  }

}