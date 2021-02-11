import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Patch,
  } from '@nestjs/common';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { createAnnouncement } from './dto/create-announcement.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(private readonly service: JobService) {}

    @Get('index/:id')
    findById(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.findById(id);
    }

    @Get('title/:title')
    findByTitle(@Param() title: string): Promise<JobAnnouncement[]> {
      return this.service.findByTitle(title);
    }

    @Get('tag/:tag')
    findByTag(@Param() tag: string): Promise<JobAnnouncement[]> {
      return this.service.findByTag(tag);
    }

    @Get('company/:company')
    findByCompany(@Param() company: string): Promise<JobAnnouncement[]> {
      return this.service.findByCompany(company);
    }
  
    @Post()
    create(@Body() dto: Omit<createAnnouncement, 'id'>): Promise<JobAnnouncement> {
      return this.service.createAnnouncement(dto);
    }
  
    @Patch(':id')
    update( @Param('id', new ParseIntPipe()) id: number, @Body() dto: Partial<Omit<JobAnnouncement, 'id'>>,): Promise<JobAnnouncement> {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.delete(id);
    }
}
