import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@vom/common';

import { User } from '../graphql/typings';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JwtAccessTokenService')
    private readonly accessTokenService: JwtService,

    @Inject('JwtRefreshTokenService')
    private readonly refreshTokenService: JwtService
  ) {}

  async generateAccessToken(user: any): Promise<string> {
    return this.accessTokenService.sign(user);
  }

  async generateRefreshToken(user: User): Promise<string> {
    return this.refreshTokenService.sign(
      {
        user: user.email,
      },
      {
        subject: user.id,
      }
    );
  }

  // async validateUser(payload: Payload) {
  //   return await this.userService.findByPayload(payload);
  // }
}
