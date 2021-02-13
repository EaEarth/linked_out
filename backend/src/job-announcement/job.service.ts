import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Like, Repository, MoreThanOrEqual } from 'typeorm';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { searchAnnouncement } from './jobDto/search-announcement.dto';
import { Tag } from 'src/entities/job/tag.entity';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobAnnouncement) private readonly repo: Repository<JobAnnouncement>,
        @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
    ){}

    index(): Promise<JobAnnouncement[]>{
        return this.repo.find();
    }

    search(dto: searchAnnouncement): Promise<JobAnnouncement[]>{

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

    async createAnnouncement(dto: createAnnouncement): Promise<JobAnnouncement>{
        var jobAnnouncement = { ...new JobAnnouncement(), ...dto };
        jobAnnouncement.tags = [];
        var tag;
        for(var i = 0; i<dto.tag.length; ++i){
            tag = await this.tagRepo.findOne({where:{ name: dto.tag[i]}});
            console.log(tag);
            if( tag === undefined ){
                console.log("in if");
                const info = {name : dto.tag[i]}
                const tagObj = {...new Tag(), ...info};
                await this.tagRepo.save(tagObj);
                jobAnnouncement.tags.push(tagObj);
            }else{
                jobAnnouncement.tags.push(tag);
            }
        }
        console.log(jobAnnouncement)
        return await this.repo.save(jobAnnouncement);
    }

    async update(id: number, dto: updateAnnouncement): Promise<JobAnnouncement> {
        const jobAnnouncement = { ...(await this.findById(id)), ...dto };
        return this.repo.save(jobAnnouncement);
    }

    async delete(id: number): Promise<JobAnnouncement>{
        const jobAnnouncement = await this.findById(id);
        await this.repo.remove(jobAnnouncement);
        return jobAnnouncement;
    }

    private prepareSearch(dto: searchAnnouncement){
        return{
            title : "title" in dto ? dto["title"] : null,
            company : "company" in dto ? dto["company"] : null,
            lowerSalary : "lowerSalary" in dto ? dto["lowerSalary"] : 0,
            province : "province" in dto ? dto["province"] : null,
            tag : "tag" in dto ? dto["tag"] : [],
        }
    }
}
