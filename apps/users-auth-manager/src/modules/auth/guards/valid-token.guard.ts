import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class ValidTokenGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user ) {
      // throw new AuthenticationError('Invaid Token');
      return "invalid";
    }

    return user;
  }
}
