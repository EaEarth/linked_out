import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobDetail } from 'src/entities/job/jobDetail.entity';
import { JobDetailController } from './job-detail.controller';
import { JobDetailService } from './job-detail.service';

@Module({
    imports: [TypeOrmModule.forFeature([JobDetail])],
    providers: [JobDetailService],
    controllers: [JobDetailController],
    exports: [JobDetailService]
})
export class JobDetailModule {}
