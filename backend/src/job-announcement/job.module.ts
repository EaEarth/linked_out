import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { CaslModule } from 'src/casl/casl.module';
import { FileItem } from 'src/entities/files/fileItem.entity';
||||||| merged common ancestors
=======
import { CaslModule } from 'src/casl/casl.module';
>>>>>>> 41d9a8e7ca774a88f1f0341625f24e1af4408f1e
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Tag } from 'src/entities/job/tag.entity';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([JobAnnouncement, Tag, FileItem]),CaslModule,UsersModule,FilesModule],
||||||| merged common ancestors
  imports: [TypeOrmModule.forFeature([JobAnnouncement, Tag]), UsersModule],
=======
  imports: [TypeOrmModule.forFeature([JobAnnouncement, Tag]),CaslModule,UsersModule],
>>>>>>> 41d9a8e7ca774a88f1f0341625f24e1af4408f1e
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
