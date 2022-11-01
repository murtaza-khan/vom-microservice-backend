import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const db = process.env.DB_DATABASE || 'timekeeper';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb://${host}:${port}/${db}`),
  ],
})
export class AppModule {}
