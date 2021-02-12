import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { JobDetailModule } from 'src/job-detail/job-detail.module';
import { JobDetailService } from 'src/job-detail/job-detail.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobAnnouncement]),JobDetailModule],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
