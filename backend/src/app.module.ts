import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { JobModule } from './job-announcement/job.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import 'reflect-metadata';


@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule,UsersModule, JobModule, JobDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
