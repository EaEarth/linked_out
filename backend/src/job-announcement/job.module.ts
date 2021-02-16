import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Tag } from 'src/entities/job/tag.entity';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobAnnouncement, Tag, FileItem]),CaslModule,UsersModule,FilesModule],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
