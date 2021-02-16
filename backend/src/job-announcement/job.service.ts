import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Like, Repository, MoreThanOrEqual, In } from 'typeorm';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { searchAnnouncement } from './jobDto/search-announcement.dto';
import { Tag } from 'src/entities/job/tag.entity';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobAnnouncement) private readonly repo: Repository<JobAnnouncement>,
        @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
        private UsersService: UsersService
    ){}

    async index(): Promise<JobAnnouncement[]>{
        return this.repo.find();
    }

    search(dto: searchAnnouncement): Promise<JobAnnouncement[]>{
        const info = this.prepareSearch(dto);

        // split search keyword
        const search = info.search.trim().split(" ");

        // for making query expression
        const query1 = "(LOWER(title) like ";
        const query2 =" OR LOWER(company) like ";
        const colon = ":";
        const end = ")";
        var variable, queryExp, parameter;

        // query
        var qb = this.repo
        .createQueryBuilder("jobAnnouncement")
        .leftJoinAndSelect("jobAnnouncement.tags", "tag")
        for(var i = 0 ; i<search.length; ++i){
            // variable for expression
            variable = "searchWord" + i;

            // query expression
            queryExp = query1+colon+variable+query2+colon+variable+end

            // for assign value of variable in expression
            parameter = `{ "${variable}": "%${search[i].toLowerCase()}%" }`

            qb = qb.orWhere(queryExp,JSON.parse(parameter)) // search title or company that contain one of the keyword
            qb = qb.andWhere("(:check like :isNull OR tag.name IN ( :name ))",{name: info.tag, check: "true", isNull : ("tag" in dto && dto["tag"].length >0) ? "false" : "true"}) // must contain one of tags
            qb = qb.andWhere("province like :province", {province: `%${info.province}%`}) // must in specific province
            qb = qb.andWhere("upperBoundSalary >= :salary", {salary: info.lowerBoundSalary}) // upperBound salary must >= specific salary
            qb = qb.andWhere(" isPublished = 1 ") // the announcement must published
        }
        const result = qb.getMany();
        return result;
    }

    findById(id: number): Promise<JobAnnouncement | undefined>{
        return this.repo.findOne(id);
    }

    async createAnnouncement(owner : User ,dto: createAnnouncement): Promise<JobAnnouncement>{
        const {tag, ...announcement} = dto
        var jobAnnouncement = { ...new JobAnnouncement(), ...announcement };
        jobAnnouncement.tags = [];
        const user = await this.UsersService.findById(owner.id);
        jobAnnouncement.owner = user;
        var seen = {};
        var tagEntity;

        // create relation with tag
        for(var i = 0; i<tag.length; ++i){

            // ensure that element in tag list is unique
            if(seen[tag[i]] === 1) continue;
            seen[tag[i]] = 1;
            tagEntity = await this.tagRepo.findOne({where:{ name: tag[i]}});

            // if the tag doesn't exist, create new one
            if( tagEntity === undefined ){
                const info = {name : tag[i]}
                const tagObj = {...new Tag(), ...info};
                await this.tagRepo.save(tagObj);
                jobAnnouncement.tags.push(tagObj);
            }else{
                jobAnnouncement.tags.push(tagEntity); // create relation with existing tag
            }
        }
        return this.repo.save(jobAnnouncement);
    }

    async update(id: number, dto: updateAnnouncement): Promise<JobAnnouncement> {
        const {tag, ...updateInfo} = dto;
        var tagArr = [];
        var seen = {};
        if(tag !== undefined){
            for(var i=0; i<tag.length; ++i){
                await this.tagRepo.findOne({where:{ name: tag[i]}}).then(async (entity)=>{
                    // ensure that element in tag list is unique
                    if(seen[tag[i]] == 1) return;
                    seen[tag[i]] = 1;

                    // if the tag doesn't exist, create new one
                    if (entity === undefined){
                        const info = {name : tag[i]}
                        const tagObj = {...new Tag(), ...info};
                        await this.tagRepo.save(tagObj);
                        tagArr.push(tagObj);
                    }else {
                        tagArr.push(entity); // create relation with existing tag
                    }
                });
            }
        }
        var announcement, repoAnnouncement
        await this.findById(id).then(async (entity)=>{
            if(tag !== undefined ) entity.tags = tagArr;
            announcement = {...entity, ...updateInfo}
            repoAnnouncement = await this.repo.save(announcement);
        })
        return repoAnnouncement
    }

    async delete(id: number): Promise<JobAnnouncement>{
        const jobAnnouncement = await this.findById(id);
        await this.repo.remove(jobAnnouncement);
        return jobAnnouncement;
    }

    private prepareSearch(dto: searchAnnouncement){
        return{
            search : "search" in dto ? dto["search"] : "",
            lowerBoundSalary : ("lowerBoundSalary" in dto && dto["lowerBoundSalary"] !== null) ? dto["lowerBoundSalary"] : 0,
            province : ("province" in dto && dto["province"] !== null) ? dto["province"] : "",
            tag : ( "tag" in dto && dto["tag"].length >0) ? dto["tag"] : [""],
        }
    }

    async createTag(name: string): Promise<Tag>{
        const tag = await this.tagRepo.findOne({where:{name: name}});
        if(tag === undefined){
            const info = {name: name};
            return await this.tagRepo.save(info);
        }
        return tag;
    }
}
