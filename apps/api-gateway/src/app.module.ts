import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';

import { LoggerModule, PinoLogger } from 'nestjs-pino';

import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver,
} from 'graphql-scalars';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // pinoHttp: {
        //   safe: true,
        //   prettyPrint: configService.get<string>('NODE_ENV') !== 'production',
        // },
        pinoHttp: {
          transport: {
              target: 'pino-pretty',
              options: {
                  ignore:'req.headers,res',
              }
          }
      },
      }),
      inject: [ConfigService],
    }),

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
          subscriptionEndpoint: '/',
          settings: {
            'request.credentials': 'include',
          },
        },
        context: ({ req, res }): any => ({ req, res }),
      }),
    }),
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   useFactory: async (logger: PinoLogger): Promise<GqlModuleOptions> => ({
    //     path: '/',
    //     subscriptions: '/',
    //     typePaths: ['./**/*.graphql'],
    //     resolvers: {
    //       DateTime: DateTimeResolver,
    //       EmailAddress: EmailAddressResolver,
    //       UnsignedInt: UnsignedIntResolver,
    //     },
    //     definitions: {
    //       path: join(__dirname, 'graphql.ts')
    //     },
    //     logger,
    //     debug: true,
    //     cors: false,
    //     installSubscriptionHandlers: true,
    //     playground: {
    //       endpoint: '/',
    //       subscriptionEndpoint: '/',
    //       settings: {
    //         'request.credentials': 'include'
    //       },
    //     },
    //     context: ({ req, res }): any => ({ req, res })
    //   }),
    //   inject: [PinoLogger]
    // }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
