import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobDetail } from 'src/entities/job/jobDetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobDetailService {
    constructor(
        @InjectRepository(JobDetail) private readonly repo: Repository<JobDetail>
    ){}

    findById(id: number): Promise<JobDetail>{
        return this.repo.findOne(id);
    }

    async createJobDetail(detail): Promise<JobDetail>{
        const jobDetail = { ...new JobDetail(), ...detail };
        return this.repo.save(jobDetail);
    }

    async update(id: number, dto: Partial<Omit<JobDetail, 'id'>>): Promise<JobDetail> {
        const jobDetail = { ...(await this.findById(id)), ...dto };
        return this.repo.save(jobDetail);
    }

    async delete(id: number): Promise<JobDetail>{
        const jobDetail = await this.findById(id);
        await this.repo.remove(jobDetail);
        return jobDetail;
    }

}
