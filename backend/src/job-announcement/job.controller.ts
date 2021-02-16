import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Patch,
    ValidationPipe,
    UsePipes,
    UseGuards,
    Request,
    UseFilters,
    ForbiddenException,
  } from '@nestjs/common';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { JobService } from './job.service';
import { searchAnnouncement } from './jobDto/search-announcement.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('job')
export class JobController {
    constructor(
      private readonly service: JobService,
    ) {}

    @Get('index')
    indexGet(): Promise<JobAnnouncement[]> {
      return this.service.index();
    }
  
    @Get('search')
    @UsePipes(new ValidationPipe({whitelist:true}))
    searchGet(@Body() dto: searchAnnouncement): Promise<JobAnnouncement[]> {
      return this.service.search(dto);
    }

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
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Request() req, @Body() dto: createAnnouncement): Promise<JobAnnouncement> {
      return this.service.createAnnouncement(req.user,dto);
    }
    
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    update(@Request() req, @Param('id', new ParseIntPipe()) id: number, @Body() dto: updateAnnouncement): Promise<JobAnnouncement> {
      for (const [key, value] of Object.entries(dto)) {
        if (value == null) {
            delete dto[key];
        }
      }
      return this.service.update(req.user ,id, dto);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Request() req,@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.delete(req.user ,id);
    }
}
