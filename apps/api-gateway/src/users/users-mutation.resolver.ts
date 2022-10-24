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
    @CurrentUser() user: User
  ): Promise<DeleteAccountPayload> {
    return this.usersService
      .destroy({
        where: JSON.stringify({
          id: user.id,
        }),
      })
      .toPromise();
  }

  @Mutation()
  async createUser(
    @Args('createUser') createUser: any,
    @CurrentUser() currentUser: any
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

  // @Mutation((returns) => UserType)
  // async editUser(
  //   @Args('id') id: string,
  //   @Args('user') user: UpdateUserInput,
  //   @CurrentUser() currentUser: User
  // ) {
  //   const isUser = await this.userService.getUsersByUserId(id);
  //   if (isUser != null) {
  //     const validateTole = await validRole(
  //       currentUser.userRole,
  //       isUser.userRole
  //     );
  //     if (id === currentUser.id || validateTole) {
  //       return await this.userService.update(id, user, currentUser);
  //     } else {
  //       throw new UnauthorizedException();
  //     }
  //   } else {
  //     throw new BadRequestException();
  //   }
  //   return;
  //   if (id === currentUser.id || currentUser.userRole === UserRoles.ADMIN) {
  //     return await this.userService.update(id, user, currentUser.userRole);
  //   } else {
  //     throw new UnauthorizedException();
  //   }
  // }

  // @Mutation((returns) => UserType)
  // async deleteUserByEmail(
  //   @Args('email') email: string,
  //   @CurrentUser() currentUser: User
  // ) {
  //   const user = await this.userService.getUsersByUserEmail(email);
  //   if (user != null) {
  //     const validateTole = await validRole(currentUser.userRole, user.userRole);
  //     if (validateTole) {
  //       if (email == currentUser.email) {
  //         throw new HttpException(
  //           `You Can't delete Yourself`,
  //           HttpStatus.BAD_REQUEST
  //         );
  //       }
  //       return await this.userService.deleteUserByEmail(email);
  //     } else {
  //       throw new HttpException(
  //         `${currentUser.userRole} can't delete ${user.userRole}`,
  //         HttpStatus.BAD_REQUEST
  //       );
  //     }
  //   } else {
  //     return user;
  //   }
  // }

  // @Mutation((returns) => UserType)
  // async deleteUserById(
  //   @Args('userId') userId: string,
  //   @CurrentUser() currentUser: User
  // ) {
  //   const user = await this.userService.getUsersByUserId(userId);
  //   const validateTole = await validRole(currentUser.userRole, user.userRole);
  //   if (user != null) {
  //     if (validateTole) {
  //       if (userId == currentUser.id) {
  //         throw new HttpException(
  //           `You Can't delete Yourself`,
  //           HttpStatus.BAD_REQUEST
  //         );
  //       }
  //       return await this.userService.deleteUserById(userId);
  //     } else {
  //       throw new HttpException(
  //         `${currentUser.userRole} can't delete ${user.userRole}`,
  //         HttpStatus.BAD_REQUEST
  //       );
  //     }
  //   } else {
  //     return user;
  //   }
  // }

  // @Mutation((returns) => UserType)
  // async getUsersByOrgId(@Args('orgId') orgId: string) {
  //   return await this.userService.getUsersByOrgId(orgId);
  // }

  // @Mutation((returns) => UserType)
  // async getUsersByGroupId(@Args('groupId') groupId: string) {
  //   return await this.userService.getUsersByGroupId(groupId);
  // }
}
