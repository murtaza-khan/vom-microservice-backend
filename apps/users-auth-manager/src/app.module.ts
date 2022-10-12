import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { join } from 'path';
import { CsvModule } from 'nest-csv-parser'
import { GroupsModule } from './modules/groups/groups.module';
import { OrganizationModule } from './modules/organization/organization.module';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

const host = process.env.DATABASE_HOST || 'localhost';
const db = process.env.DB_NAME;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: true,
      resolverValidationOptions: {
        // requireResolversForResolveType: false,
      },
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot(`mongodb://${host}/${db}`),
    UserModule,
    AuthModule,
    CsvModule,
    GroupsModule,
    OrganizationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}