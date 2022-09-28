import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../../shared/types/user';
import { UserService } from '../users/user.service';
import { Payload } from '../../shared/types/payload';
import { AuthType } from '../../core/models/auth.type';
import { UserRoles } from '../../shared/user-roles';

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
    return { email: response.email, token };
  }
}
