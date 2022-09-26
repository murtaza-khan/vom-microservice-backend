import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards, UnauthorizedException, SetMetadata, Inject } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../../core/decorators/user.decorator';
import { User } from '../../shared/types/user';
import { UserType } from './model/user.model';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRoles } from '../../shared/user-roles';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
    ) {}

  // @Roles("Admin")
  @Roles("employee")

  @Query(returns => UserType)
  async getUser(@CurrentUser() user: any) {
    console.log("CurrentUser " , user);
      return await this.userService.getUsers();
  }

  // @Mutation(returns => UserType)
  // async delete(@Args('email') email: string, @CurrentUser() user: User) {
  //   if (email === user.email) {
  //     return await this.userService.deleteUserByEmail(email);
  //   } else {
  //     throw new UnauthorizedException();
  //   }
  // }

  @Mutation(returns => UserType)
  async createUser(@Args() args: any, @CurrentUser() user: any) {
  // async createUser(@Args() args: any) {
    const { createUser } = args;
    const response = await this.userService.create(createUser);
    return response;
  }

  @Mutation(returns => UserType)
  async editUser(
    @Args('id') id: string,
    @Args('user') user: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    if (id === currentUser.id || currentUser.userRole === UserRoles.ADMIN) {
      return await this.userService.update(id, user, currentUser.userRole);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(returns => UserType)
  async deleteUser(@Args('email') email: string) {
      return await this.userService.deleteUserByEmail(email);
  }

  @Mutation(returns => UserType)
  async deleteUserById(@Args("userId") userId :string){
    return await this.userService.deleteUserById(userId);
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
