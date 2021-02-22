import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api');
  //app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors({
    credentials: true
  });
  app.use(helmet())
  app.use(cookieParser("superDuperSecretCookieKey"))
  //app.set('trust proxy', 1);
  await app.listen(8000);
}
bootstrap();

