import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'

import { UsersModule } from '../users/users.module'
import { UtilsModule } from '../utils/utils.module'
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy'

@Module({
  imports: [ConfigModule, UtilsModule, PassportModule.register({ defaultStrategy: 'jwt' }), forwardRef(() => UsersModule)],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthResolver,
    {
      provide: 'JwtAccessTokenService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          // secret: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
          secret: 'secretKey',
          signOptions: {
            audience: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_ISSUER'),
            expiresIn: '30min'
          }
        })
      }
    },
    {
      provide: 'JwtRefreshTokenService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('JWT_REFRESHTOKEN_SECRET'),
          signOptions: {
            audience: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_ISSUER'),
            expiresIn: '30min'
          }
        })
      }
    },
    {
      provide: 'AuthServiceClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_URL'),
            package: 'user',
            protoPath: join(__dirname, '../_proto/user.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
  exports: ['AuthServiceClient']
})
export class AuthModule {}
