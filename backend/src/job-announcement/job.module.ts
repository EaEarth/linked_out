import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Tag } from 'src/entities/job/tag.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobAnnouncement, Tag])],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
