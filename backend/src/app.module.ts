import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { JobModule } from './job-announcement/job.module';
import { CaslModule } from './casl/casl.module';
import { FilesModule } from './files/files.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './chat.gateway';
import 'reflect-metadata';
import { join } from 'path';
import { PaymentController } from './payment/payment/payment.controller';
import { PaymentModule } from './payment/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, JobModule, CaslModule,ChatModule, FilesModule, JobApplicationModule, ChatModule, PaymentModule],
  controllers: [AppController, PaymentController],
  providers: [AppService, AppGateway],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
