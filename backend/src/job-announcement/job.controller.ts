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
import { Tag } from 'src/entities/job/tag.entity';

@Controller('job')
export class JobController {
  constructor(
    private readonly service: JobService,
  ) { }

    @Get('index')
    indexGet(): Promise<JobAnnouncement[]> {
      return this.service.index();
    }

    @Get('indexAll')
    indexGetAll(): Promise<JobAnnouncement[]> {
      return this.service.indexAll();
    }

    @Get('tag/index')
    indexTag(): Promise<Tag[]> {
      return this.service.indexTag();
    }
  
    @Get('search')
    @UsePipes(new ValidationPipe({whitelist:true}))
    searchGet(@Body() dto: searchAnnouncement): Promise<JobAnnouncement[]> {
      return this.service.search(dto);
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
        if (value == null || value === '') {
            delete dto[key];
        }
      }
      return this.service.update(req.user, id, dto);
    }

    @Get('index/:id')
    findById(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.findById(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Request() req, @Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.delete(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('tag/:name')
    createTag(@Param('name') name: string): Promise<Tag> {
      return this.service.createTag(name);
    }
}
