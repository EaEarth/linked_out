import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Like, Repository, MoreThanOrEqual } from 'typeorm';
import { JobDetailService } from 'src/job-detail/job-detail.service';
import { createAnnouncement } from './dto/create-announcement.dto';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobAnnouncement) private readonly repo: Repository<JobAnnouncement>,
        private readonly service: JobDetailService
    ){}

    index(): Promise<JobAnnouncement[]>{
        return this.repo.find();
    }

    findById(id: number): Promise<JobAnnouncement>{
        return this.repo.findOne(id);
    }

    findByTitle(title: string): Promise<JobAnnouncement[]>{
        return this.repo.find({where:{ title: title, is_published: true }});
    }

    findByTag(tag: string): Promise<JobAnnouncement[]>{
        return this.repo.find({where:{ tag: Like("%"+tag+"%"), is_published: true }});
    }

    findByCompany(company: string): Promise<JobAnnouncement[]>{
        return this.repo.find({where:{ company: Like("%"+company+"%"), is_published: true }});
    }

    findBySalary(salaryMin: number): Promise<JobAnnouncement[]>{
        return this.repo.find({where:{ salary: MoreThanOrEqual(salaryMin) }});
    }

    async createAnnouncement(dto: Omit<createAnnouncement, 'id'>): Promise<JobAnnouncement>{
        var {detailDescription,address, amountRequired, ...announcement} = dto
        const jobDetail = this.service.createJobDetail({description: detailDescription, address: address, amountRequired: amountRequired});
        announcement =  Object.assign({jobDetail: jobDetail}, announcement);
        const jobAnnouncement = { ...new JobAnnouncement(), ...announcement };
        return this.repo.save(jobAnnouncement);
    }

    async update(id: number, dto: Partial<Omit<JobAnnouncement, 'id'>>): Promise<JobAnnouncement> {
        const jobAnnouncement = { ...(await this.findById(id)), ...dto };
        return this.repo.save(jobAnnouncement);
    }

    async delete(id: number): Promise<JobAnnouncement>{
        const jobAnnouncement = await this.findById(id);
        await this.repo.remove(jobAnnouncement);
        return jobAnnouncement;
    }
}
