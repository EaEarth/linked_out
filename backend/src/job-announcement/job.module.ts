import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
imports: [TypeOrmModule.forFeature([JobAnnouncement])],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
