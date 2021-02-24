import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { Repository } from 'typeorm';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { searchAnnouncement } from './jobDto/search-announcement.dto';
import { Tag } from 'src/entities/job/tag.entity';
import { User } from 'src/entities/users/user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/policies/action.enum';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { FileItem } from 'src/entities/files/fileItem.entity';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobAnnouncement) private readonly repo: Repository<JobAnnouncement>,
        @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
        @InjectRepository(FileItem) private readonly fileRepo: Repository<FileItem>,
        private usersService: UsersService,
        private filesService: FilesService,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ) { }

    index(): Promise<JobAnnouncement[]> {
        return this.repo.find({ relations: ["picture", "tags"], where: { isPublished: true } });
    }

    indexAll(): Promise<JobAnnouncement[]> {
        return this.repo.find({ relations: ["picture", "tags","owner"], where: { isPublished: true } });
    }

    indexTag(): Promise<Tag[]> {
        return this.tagRepo.find();
    }

    search(dto: searchAnnouncement): Promise<JobAnnouncement[]> {
        const info = this.prepareSearch(dto);

        // split search keyword
        const search = info.search.trim().split(" ");

        // for making query expression
        const query1 = "(LOWER(jobAnnouncement.title) like ";
        const query2 = " OR LOWER(company) like ";
        const colon = ":";
        const end = ")";
        var variable, queryExp, parameter;

        // query
        var qb = this.repo
            .createQueryBuilder("jobAnnouncement")
            .leftJoinAndSelect("jobAnnouncement.picture", "picture")
            .leftJoinAndSelect("jobAnnouncement.tags", "tag")
        for (var i = 0; i < search.length; ++i) {
            // variable for expression
            variable = "searchWord" + i;

            // query expression
            queryExp = query1 + colon + variable + query2 + colon + variable + end

            // for assign value of variable in expression
            parameter = `{ "${variable}": "%${search[i].toLowerCase()}%" }`

            qb = qb.orWhere(queryExp, JSON.parse(parameter)) // search title or company that contain one of the keyword
            qb = qb.andWhere("(:check like :isNull OR tag.name IN ( :name ))", { name: info.tag, check: "true", isNull: ("tag" in dto && dto["tag"].length > 0) ? "false" : "true" }) // must contain one of tags
            qb = qb.andWhere("province like :province", { province: `%${info.province}%` }) // must in specific province
            qb = qb.andWhere("upperBoundSalary >= :salary", { salary: info.lowerBoundSalary }) // upperBound salary must >= specific salary
            qb = qb.andWhere(" isPublished = 1 ") // the announcement must published
        }
        const result = qb.getMany();
        return result;
    }

    findById(id: number): Promise<JobAnnouncement | undefined> {
        return this.repo.findOne(id, { relations: ["picture", "tags"] });
    }

    findFromOwner(userId: number): Promise<JobAnnouncement[]> {
        return this.repo.createQueryBuilder("jobAnnouncement")
            .leftJoinAndSelect("jobAnnouncement.picture", "picture")
            .leftJoinAndSelect("jobAnnouncement.tags", "tag")
            .leftJoinAndSelect("jobAnnouncement.owner", "owner")
            .where("owner.id = :id", { id: userId })
            .getMany()
    }

    async createAnnouncement(owner: User, dto: createAnnouncement): Promise<JobAnnouncement> {
        const { tag, pictureId, ...announcement } = dto
        var jobAnnouncement = { ...new JobAnnouncement(), ...announcement };
        jobAnnouncement.tags = [];
        const user = await this.usersService.findById(owner.id);
        jobAnnouncement.owner = user;
        var seen = {};
        var tagEntity;

        const picture = await this.filesService.findById(pictureId);
        if (picture == undefined) throw new NotFoundException();
        jobAnnouncement.picture = picture

        // create relation with tag
        for (var i = 0; i < tag.length; ++i) {

            // ensure that element in tag list is unique
            if (seen[tag[i]] === 1) continue;
            seen[tag[i]] = 1;
            tagEntity = await this.tagRepo.findOne({ where: { name: tag[i] } });

            // if the tag doesn't exist, create new one
            if (tagEntity === undefined) {
                const info = { name: tag[i] }
                const tagObj = { ...new Tag(), ...info };
                await this.tagRepo.save(tagObj);
                jobAnnouncement.tags.push(tagObj);
            } else {
                jobAnnouncement.tags.push(tagEntity); // create relation with existing tag
            }
        }
        return this.repo.save(jobAnnouncement);
    }

    async update(owner: User, id: number, dto: updateAnnouncement): Promise<JobAnnouncement> {
        const { tag, pictureId, ...updateInfo } = dto;
        var tagArr = [];
        var seen = {};
        const ability = this.caslAbilityFactory.createForUser(owner);
        if (tag !== undefined) {
            for (var i = 0; i < tag.length; ++i) {
                await this.tagRepo.findOne({ where: { name: tag[i] } }).then(async (entity) => {
                    // ensure that element in tag list is unique
                    if (seen[tag[i]] == 1) return;
                    seen[tag[i]] = 1;

                    // if the tag doesn't exist, create new one
                    if (entity === undefined) {
                        const info = { name: tag[i] }
                        const tagObj = { ...new Tag(), ...info };
                        await this.tagRepo.save(tagObj);
                        tagArr.push(tagObj);
                    } else {
                        tagArr.push(entity); // create relation with existing tag
                    }
                });
            }
        }
        var announcement, repoAnnouncement
        await this.repo.findOne(id, { relations: ["owner"] }).then(async (entity) => {
            if (entity == undefined) throw new NotFoundException();
            if (!ability.can(Action.Update, entity) && !(owner.id == entity.owner.id)) throw new UnauthorizedException();
            if (tag !== undefined) entity.tags = tagArr;
            if (pictureId !== undefined) {
                const picture = await this.fileRepo.findOne(pictureId)
                if (picture === undefined) throw new NotFoundException();
                entity.picture = picture;
            }
            announcement = { ...entity, ...updateInfo }
            repoAnnouncement = await this.repo.save(announcement);
        })
        return repoAnnouncement
    }

    async delete(owner: User, id: number): Promise<JobAnnouncement> {
        const ability = this.caslAbilityFactory.createForUser(owner);
        const jobAnnouncement = await this.repo.findOne(id, { relations: ["owner"] });
        if (jobAnnouncement == undefined) throw new NotFoundException();
        if (!ability.can(Action.Update, jobAnnouncement) && !(owner.id == jobAnnouncement.owner.id)) throw new UnauthorizedException();
        await this.repo.remove(jobAnnouncement);
        return jobAnnouncement;
    }

    private prepareSearch(dto: searchAnnouncement) {
        return {
            search: "search" in dto ? dto["search"] : "",
            lowerBoundSalary: ("lowerBoundSalary" in dto && dto["lowerBoundSalary"] !== null) ? dto["lowerBoundSalary"] : 0,
            province: ("province" in dto && dto["province"] !== null) ? dto["province"] : "",
            tag: ("tag" in dto && dto["tag"].length > 0) ? dto["tag"] : [""],
        }
    }

    async createTag(name: string): Promise<Tag> {
        const tag = await this.tagRepo.findOne({ where: { name: name } });
        if (tag === undefined) {
            const info = { name: name };
            return await this.tagRepo.save(info);
        }
        return tag;
    }
}
