import { join } from 'path'
import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport, ClientGrpcProxy } from '@nestjs/microservices'

import { UsersQueryResolver } from './users-query.resolver'
import { UsersMutationResolver } from './users-mutation.resolver'

import { UtilsModule } from '../utils/utils.module'

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    UsersQueryResolver,
    UsersMutationResolver,
    {
      provide: 'UsersServiceClient',
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
  exports: ['UsersServiceClient']
})
export class UsersModule {}
