import {
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { PinoLogger } from 'nestjs-pino';

import { IUsersService, UserRoles } from './users.interface';
import {
  User,
  UserPayload,
  UpdateProfileInput,
  UpdateEmailInput,
  UpdatePasswordInput,
  DeleteAccountPayload,
  ForgotPassword,
  ForgotPasswordInput,
  ResetPasswordUpdateInput,
  ResponseType,
  UserInPut,
  DeleteAccountInput,
  UserUpdateInPut,
} from '../graphql/typings';

import { PasswordUtils } from '../utils/password.utils';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import { validRole } from '@vom/common';

@Resolver()
export class UsersMutationResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly passwordUtils: PasswordUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersMutationResolver.name);
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
  async createUser(
    @Args('createUser') createUser: UserInPut,
    @CurrentUser() currentUser: User
  ) {
    if (createUser.userRole == undefined) {
      createUser.userRole = UserRoles.EMPLOYEE;
    }
    const validateTole = await validRole(
      currentUser.userRole,
      createUser.userRole
    );
    if (validateTole) {
      if (createUser.userRole === UserRoles.ADMIN && !createUser.organization) {
        throw new HttpException(
          `Organization Id is required for Admin`,
          HttpStatus.BAD_REQUEST
        );
      }
      if (
        currentUser.userRole === UserRoles.ADMIN ||
        currentUser.userRole === UserRoles.GROUP_MANAGER
      ) {
        createUser.organization = currentUser.organization;
      }
      const response = await this.usersService.create(createUser);
      return response;
    } else {
      throw new HttpException(
        `${currentUser.userRole} can't create ${createUser.userRole}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Mutation()
  async editUser(
    @Args('user') user: UserUpdateInPut,
    @CurrentUser() currentUser: User
  ) {
    return await this.usersService.update(user);
  }
}
