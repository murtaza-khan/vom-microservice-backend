import { Resolver, Mutation, Args , Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, Payload, UserRoles } from '@vom/common';
import { UserService } from '../users/user.service';
import { AuthType } from '../../core/models/auth.type';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from './guards/gql-auth.guard';
import { ValidTokenGuard } from './guards/valid-token.guard';
import { CurrentUser } from '../../core/decorators/user.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(returns => AuthType)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // used any instead of User
    const user: any = { email, password, userRole: UserRoles.EMPLOYEE };
    try {
      const response: any = await this.userService.create(user);
      const payload: Payload = {
        email: response.email,
        role: response.userRole,
        organization : response.organization
      };
  
      const token = await this.authService.signPayload(payload);
      return { email: response.email, token };
    } catch(exception) {
      throw exception
    }
  }

  @Mutation(returns => AuthType)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: any = { email, password };
    const response: User = await this.userService.findByLogin(user);
    console.log(response);
    const payload: Payload = {
      email: response.email,
      role: response.userRole,
      organization : response.organization
    };

    const token = await this.authService.signPayload(payload);
    return { email: response.email, role: response.userRole ,  token };
  }

  @UseGuards(ValidTokenGuard)
  @Query(returns => Boolean)
  async validToken(@CurrentUser() currentUser: any){
    if(currentUser === 'invalid'){
      return false
    }
    else{
      return true;
    }
  }
}
