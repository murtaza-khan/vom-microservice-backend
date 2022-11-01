import {
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { IUsersService, UserRoles } from './users.interface';
import {
  User,
  ForgotPassword,
  ForgotPasswordInput,
  ResetPasswordUpdateInput,
  ResponseType,
  DeleteAccountInput,
  UserUpdateInPut,
} from '../graphql/typings';

import { PasswordUtils } from '../utils/password.utils';
import { validRole } from '@vom/common';
import { CurrentUser } from '../auth/user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersMutationResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly passwordUtils: PasswordUtils,

  ) {
  }

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  @Mutation()
  async forgotPassword(
    @CurrentUser() user: any,
    @Args('data') data: ForgotPasswordInput
  ): Promise<ForgotPassword> {
    const response: any = await this.usersService.forgotPassword({
      email: data.email,
    });
    return response;
  }

  @Mutation()
  async resetPasswordUpdate(
    @CurrentUser() user: any,
    @Args('data') data: ResetPasswordUpdateInput
  ): Promise<ResponseType> {
    const response: any = await this.usersService.resetPasswordUpdate({
      id: data.id,
      token: data.token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    return response;
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteAccount(
    @CurrentUser() user: User,
    @Args('data') data: DeleteAccountInput
  ): Promise<any> {
    let where: any = {};
    if (data.id) {
      where.id = data.id;
    } else {
      where.email = data.email;
    }
    return this.usersService.destroy({
      where: JSON.stringify({
        id: user.id,
      }),
    });
  }

  @Mutation()
  async editUser(
    @Args('user') user: UserUpdateInPut,
    @CurrentUser() currentUser: User
  ) {
    return await this.usersService.update(user);
  }
}
