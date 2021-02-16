import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Like, Repository, MoreThanOrEqual } from 'typeorm';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { searchAnnouncement } from './jobDto/search-announcement.dto';
import { Tag } from 'src/entities/job/tag.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/users/user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/policies/action.enum';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobAnnouncement) private readonly repo: Repository<JobAnnouncement>,
        @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
        private usersService: UsersService,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ){}

    index(): Promise<JobAnnouncement[]>{
        return this.repo.find();
    }

    search(dto: searchAnnouncement): Promise<JobAnnouncement[]>{

        return this.repo.find();
    }

    findById(id: number): Promise<JobAnnouncement | undefined>{
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
        return this.repo.find({where:{ lowerSalary: MoreThanOrEqual(salaryMin), is_published: true }});
    }

    async createAnnouncement(owner : User ,dto: createAnnouncement): Promise<JobAnnouncement>{
        const {tag, ...announcement} = dto
        var jobAnnouncement = { ...new JobAnnouncement(), ...announcement };
        jobAnnouncement.tags = [];
        jobAnnouncement.owner = owner;
        var seen = {};
        var tagEntity;
        for(var i = 0; i<tag.length; ++i){
            if(seen[tag[i]] === 1) continue;
            seen[tag[i]] = 1;
            tagEntity = await this.tagRepo.findOne({where:{ name: tag[i]}});
            if( tagEntity === undefined ){
                const info = {name : tag[i]}
                const tagObj = {...new Tag(), ...info};
                await this.tagRepo.save(tagObj);
                jobAnnouncement.tags.push(tagObj);
            }else{
                jobAnnouncement.tags.push(tagEntity);
            }
        }
        return await this.repo.save(jobAnnouncement);
    }

    async update(owner : User ,id: number, dto: updateAnnouncement): Promise<JobAnnouncement> {
        const {tag, ...updateInfo} = dto;
        var tagArr = [];
        var seen = {};
        var tagEntity;
        const ability = this.caslAbilityFactory.createForUser(owner);
        if(tag !== undefined){
            for(var i=0; i<tag.length; ++i){
                tagEntity = await this.tagRepo.findOne({where:{ name: tag[i]}}).then(async (entity)=>{
                    if(seen[tag[i]] == 1) return;
                    seen[tag[i]] = 1;
                    if (entity === undefined){
                        const info = {name : tag[i]}
                        const tagObj = {...new Tag(), ...info};
                        await this.tagRepo.save(tagObj);
                        tagArr.push(tagObj);
                    }else {
                        tagArr.push(entity);
                    }
                });
            }
        }
        var announcement, repoAnnouncement
        await this.repo.findOne(id,{relations:["owner"]}).then(async (entity)=>{
            if(entity == undefined) throw new NotFoundException();
            if(!ability.can(Action.Update,entity) && !(owner.id == entity.owner.id)) throw new UnauthorizedException();
            if(tag !== undefined ) entity.tags = tagArr;
            announcement = {...entity, ...updateInfo}
            repoAnnouncement = await this.repo.save(announcement);
        })
        return repoAnnouncement
    }

    async delete(owner: User,id: number): Promise<JobAnnouncement>{
        const ability = this.caslAbilityFactory.createForUser(owner);
        const jobAnnouncement = await this.repo.findOne(id,{relations:["owner"]});
        if(jobAnnouncement == undefined) throw new NotFoundException();
        if(!ability.can(Action.Update,jobAnnouncement) && !(owner.id == jobAnnouncement.owner.id)) throw new UnauthorizedException();
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
