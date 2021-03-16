import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { JobApplication } from 'src/entities/job/jobApplication.entity';
import { User } from 'src/entities/users/user.entity';
import { FilesService } from 'src/files/files.service';
import { JobService } from 'src/job-announcement/job.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { createApplication } from './dto/create-application.dto';
import { updateApplication } from './dto/update-application.dto';
import { Action } from 'src/policies/action.enum';

@Injectable()
export class JobApplicationService {
    constructor(
        @InjectRepository(JobApplication) private readonly repo: Repository<JobApplication>,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private usersService: UsersService,
        private filesService: FilesService,
        private jobAnnouncementService: JobService
    ) {}

    index(): Promise<JobApplication[]>{
        //return this.repo.find({ relations: ["jobAnnouncement", "applicant", "resume", "transcript", "coverLetter"]});
        return this.getApplicationBuilder()
        .leftJoinAndSelect("jobApplication.resume", "resume")
        .leftJoinAndSelect("jobApplication.coverLetter", "coverLetter")
        .leftJoinAndSelect("jobApplication.transcript", "transcript")
        .getMany()
    }

    async findById(id: number): Promise<JobApplication>{
        // const application = await this.repo.findOne(id, { relations: ["jobAnnouncement", "applicant", "resume", "transcript", "coverLetter"]});
        // if(application === undefined) throw new NotFoundException("Job announcement not found")
        // return application
        return this.getApplicationBuilder()
            .where("jobApplication.id = :id", { id: id })
            .leftJoinAndSelect("jobApplication.resume", "resume")
            .leftJoinAndSelect("jobApplication.coverLetter", "coverLetter")
            .leftJoinAndSelect("jobApplication.transcript", "transcript")
            .getOne()
    }

    findFromApplicant(userId: number): Promise<JobApplication[]> {
        return this.getApplicationBuilder()
            .where("applicant.id = :id", { id: userId })
            .getMany()
    }

    findFromRecruiter(recruiterId: number): Promise<JobApplication[]>{
        return this.getApplicationBuilder()
            .leftJoinAndSelect("announcement.owner", "recruiter")
            .where("recruiter.id = :id", { id: recruiterId })
            .getMany();
    }

    findFromAnnouncement(announcementId: number): Promise<JobApplication[]>{
        return this.getApplicationBuilder()
        .where("announcement.id = :id", { id: announcementId })
        .getMany();
    }

    private getApplicationBuilder() {
        return this.repo.createQueryBuilder("jobApplication")
        .leftJoinAndSelect("jobApplication.jobAnnouncement", "announcement")
        .leftJoinAndSelect("announcement.picture", "picture")
        .leftJoinAndSelect("jobApplication.applicant", "applicant")
        .leftJoinAndSelect("applicant.avatarFile", "avatar")
    }

    async createJobApplication(applicant: User, dto: createApplication): Promise<JobApplication>{
        const {jobAnnouncementId, resumeId, transcriptId, coverLetterId, ...form} = dto;
        var application = { ...new JobApplication(), ...form};

        if(jobAnnouncementId === undefined || jobAnnouncementId === null || jobAnnouncementId <= 0) {
            throw new NotFoundException("Job announcement not found")
        }

        const user = await this.usersService.findUserById(applicant.id);
        const resume = await this.findFileOrNull(resumeId);
        const jobAnnouncement = await this.jobAnnouncementService.findAnnouncementById(jobAnnouncementId);
        const transcript = await this.findFileOrNull(transcriptId);
        const coverLetter = await this.findFileOrNull(coverLetterId);

        if(resume === undefined) throw new NotFoundException("Resume file not found")
        if(jobAnnouncement === undefined) throw new NotFoundException("Job announcement not found")
        if(transcript === undefined) throw new NotFoundException("Transcript file not found")
        if(coverLetter === undefined) throw new NotFoundException("Cover letter file not found")

        application.applicant = user;
        application.coverLetter = coverLetter;
        application.jobAnnouncement = jobAnnouncement;
        application.transcript = transcript;
        application.resume = resume;
        return this.repo.save(application);
    }

    async updateJobApplication(id: number, dto: updateApplication): Promise<JobApplication>{
        const {jobAnnouncementId, resumeId, transcriptId, coverLetterId, ...form} = dto;
        const application = await this.repo.findOne(id);

        const resume = await this.findFileOrNull(resumeId);
        const jobAnnouncement = await this.jobAnnouncementService.findAnnouncementById(jobAnnouncementId);
        const transcript = await this.findFileOrNull(transcriptId);
        const coverLetter = await this.findFileOrNull(coverLetterId);

        if(resume === undefined) throw new NotFoundException("Resume file not found")
        if(jobAnnouncement === undefined) throw new NotFoundException("Job announcement not found")
        if(transcript === undefined) throw new NotFoundException("Transcript file not found")
        if(coverLetter === undefined) throw new NotFoundException("Cover letter file not found")
        if(application === undefined) throw new NotFoundException("Job application not found")

        application.coverLetter = coverLetter;
        application.jobAnnouncement = jobAnnouncement;
        application.transcript = transcript;
        application.resume = resume;

        const newApplication = {...application, ...form};
        return this.repo.save(newApplication)
    }

    private findFileOrNull(id: number): Promise<FileItem> {
        if(id === undefined || id === null || id <= 0) return null;
        return this.filesService.findById(id);
    }

    async delete(applicant: User, id: number): Promise<JobApplication> {
        const ability = this.caslAbilityFactory.createForUser(applicant);
        const jobApplication = await this.repo.findOne(id, { relations: ["applicant"]});
        if (jobApplication === undefined) throw new NotFoundException("Job application not found");
        if (!ability.can(Action.Update, jobApplication) && !(applicant.id == jobApplication.applicant.id)) throw new UnauthorizedException();
        this.repo.remove(jobApplication);
        return jobApplication;
    }
}
