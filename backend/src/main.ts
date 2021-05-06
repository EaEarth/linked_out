import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './socketio.adapter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableCors();
  //app.useGlobalFilters(new AllExceptionFilter());
  app.use(helmet());
  app.use(cookieParser('superDuperSecretCookieKey'));
  app.enableCors({
    origin: ['http://localhost:3000', process.env.URL],
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  //app.set('trust proxy', 1);

  await app.listen(8000);
}
bootstrap();
