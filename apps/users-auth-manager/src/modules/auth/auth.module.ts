import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailScalar } from '../../core/scalars/email.scalar';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, EmailScalar],
  controllers: [AuthController],

})
export class AuthModule {}
