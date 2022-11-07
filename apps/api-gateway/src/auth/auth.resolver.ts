import { Inject, OnModuleInit, Query, UseGuards } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { isEmpty } from 'lodash';

import { AuthService } from './auth.service';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { CurrentUser } from './user.decorator';

import {
  User,
  UserPayload,
  UserInPut,
  LoginUserInput,
} from '../graphql/typings';
import { IUsersService } from '../users/users.interface';
import { ValidTokenGuard } from './guards/valid-token.guard';
import { Payload } from '@vom/common';

@Resolver('Auth')
export class AuthResolver implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly authService: AuthService
  ) {}

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  @Mutation()
  async create(@Args('data') data: UserInPut): Promise<UserPayload> {
    try {
      const user = await this.usersService.create(data).toPromise();
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation()
  async login(@Args('data') data: LoginUserInput): Promise<any> {
    const user: any = await this.usersService.login(data).toPromise();

    const payload: Payload = {
      email: user.email,
      role: user.userRole,
      organization: user.organization,
    };

    const token = await this.authService.generateAccessToken(payload);
    console.log('LLLLLLLLLLLLL', token);

    return { token };
  }

  @Mutation()
  @UseGuards(RefreshAuthGuard)
  async refreshToken(
    @Context() context: any,
    @CurrentUser() user: User
  ): Promise<UserPayload> {
    const { res } = context;

    res.cookie(
      'access-token',
      await this.authService.generateAccessToken(user),
      {
        httpOnly: true,
        maxAge: 1.8e6,
      }
    );
    res.cookie(
      'refresh-token',
      await this.authService.generateRefreshToken(user),
      {
        httpOnly: true,
        maxAge: 1.728e8,
      }
    );

    return { user };
  }

  @Mutation()
  async logout(@Context() context: any): Promise<boolean> {
    const { res } = context;

    res.cookie('access-token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.cookie('refresh-token', '', {
      httpOnly: true,
      maxAge: 0,
    });

    return true;
  }

  // @Query()
  @UseGuards(ValidTokenGuard)
  async validToken(@CurrentUser() currentUser: any) {
    if (currentUser === 'invalid') {
      return false;
    } else {
      return true;
    }
  }
}
