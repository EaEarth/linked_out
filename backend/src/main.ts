import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true
    }
  });
  //app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api');
  //app.useGlobalFilters(new AllExceptionFilter());
  app.use(helmet())
  app.use(cookieParser("superDuperSecretCookieKey"))
  await app.listen(8000);
}
bootstrap();

