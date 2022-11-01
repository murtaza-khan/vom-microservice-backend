import { NestFactory } from '@nestjs/core';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';

// @ts-ignore
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function main() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter()
    );
  const configService: ConfigService = app.get(ConfigService);

  app.use(
    cors(
      {
      origin: '*',
      credentials: true
    }
    )
  )
  app.use(cookieParser());

  return app.listen(configService.get<number>('GRAPHQL_PORT'));
}

main();
