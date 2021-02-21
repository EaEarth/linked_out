import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.setGlobalPrefix('api');
  //app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors({
    credentials: true
  });
  app.use(helmet())
  await app.listen(8000);
}
bootstrap();
