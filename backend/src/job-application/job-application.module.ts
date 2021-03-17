import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { JobApplication } from 'src/entities/job/jobApplication.entity';
import { FilesModule } from 'src/files/files.module';
import { JobModule } from 'src/job-announcement/job.module';
import { CreateAll } from 'src/seeds/createAll.seed';
import { UsersModule } from 'src/users/users.module';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication]),CaslModule,UsersModule,FilesModule,JobModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService]
})
export class JobApplicationModule {}
