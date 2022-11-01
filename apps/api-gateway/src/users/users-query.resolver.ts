import {
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Query, Resolver, Args } from '@nestjs/graphql';

import { isEmpty, merge } from 'lodash';

import { IUsersService, UserRoles } from './users.interface';
import {
  ForgotPassword,
  ForgotPasswordInput,
  OrgIdInput,
  ResetPassword,
  ResetPasswordInput,
  User,
  UserPayload,
  UsersConnection,
} from '../graphql/typings';

import { QueryUtils } from '../utils/query.utils';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/user.decorator';

@Resolver('User')
export class UsersQueryResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly queryUtils: QueryUtils,

  ) {
  }

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  @Query('users')
  @UseGuards(GqlAuthGuard)
  async getUsers(
    @Args('q') q: string,
    @Args('first') first: number,
    @Args('last') last: number,
    @Args('before') before: string,
    @Args('after') after: string,
    @Args('filterBy') filterBy: any,
    @Args('orderBy') orderBy: string
  ): Promise<UsersConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: q } } });

    merge(
      query,
      await this.queryUtils.buildQuery(
        filterBy,
        orderBy,
        first,
        last,
        before,
        after
      )
    );

    return this.usersService
      .find({
        ...query,
        where: JSON.stringify(query.where),
      })
      .toPromise();
  }

  @Query('user')
  // @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findById({ id }).toPromise();
  }

  @Query('userCount')
  @UseGuards(GqlAuthGuard)
  async getUserCount(
    @Args('q') q: string,
    @Args('filterBy') filterBy: any
  ): Promise<number> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: q } } });

    merge(query, await this.queryUtils.getFilters(filterBy));

    const { count } = await this.usersService
      .count({
        ...query,
        where: JSON.stringify(query.where),
      })
      .toPromise();

    return count;
  }

  @Query('resetPassword')
  async resetPassword(
    @CurrentUser() user: any,
    @Args('data') data: ResetPasswordInput
  ): Promise<ResetPassword> {
    const response: any = await this.usersService.resetPassword({
      id: data.id,
      token: data.token,
    });
    return response;
  }

  @Query('getUsersByOrgId')
  async getUsersByOrgId(
    @CurrentUser() user: any,
    @Args('data') data: OrgIdInput
  ): Promise<UserPayload> {
    try {
      const a = await this.usersService
        .getUsersByOrgId({ orgId: data.orgId })
        .toPromise();
      return a;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getUsersByGroupId')
  async getUsersByGroupId(
    @CurrentUser() user: any,
    @Args('orgId') groupId: string
  ): Promise<UserPayload> {
    try {
      const a = await this.usersService.getUsersByGroupId(groupId).toPromise();
      return a;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('getManagersByOrgID')
  async getManagersByOrgID(
    @CurrentUser() currentUser: any
  ): Promise<UserPayload> {
    if (currentUser.userRole == UserRoles.ADMIN) {
      return await this.usersService
        .getManagersByOrgID(currentUser.organization)
        .toPromise();
    } else {
      throw new HttpException(
        `${currentUser.userRole} can't get managers`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Query('me')
  @UseGuards(GqlAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById({ id: user.id }).toPromise();
  }
}
