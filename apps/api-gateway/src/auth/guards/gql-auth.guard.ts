import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req
    return request;
  }

  handleRequest(err: any, user: any, info: any) { 
    console.log('>>>>>>>>SSSSSSSSSSSSSSSSSSS',user);
       
    if (err || !user) {
      // throw err || new AuthenticationError('Could not authenticate with token');
      throw err || new HttpException(`UNAUTHORIZED`, HttpStatus.UNAUTHORIZED);

    }

    return user;
  }
}