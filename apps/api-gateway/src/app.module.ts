import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';

import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver,
} from 'graphql-scalars';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        path: '/',
        typePaths: ['./**/*schema.graphql'],
        resolvers: {
          DateTime: DateTimeResolver,
          EmailAddress: EmailAddressResolver,
          UnsignedInt: UnsignedIntResolver,
        },
        definitions: {
          path: join(__dirname, 'graphql.ts'),
        },
        debug: true,
        cors: false,
        playground: {
          endpoint: '/',
          // subscriptionEndpoint: '/',
          // settings: {
          //   'request.credentials': 'include',
          // },
        },
        context: ({ req, res }): any => ({ req, res }),
      }),
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
