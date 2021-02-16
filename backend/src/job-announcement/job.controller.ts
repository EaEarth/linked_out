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
    constructor(private readonly service: JobService) {}

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
  
    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Request() req, @Body() dto: createAnnouncement): Promise<JobAnnouncement> {
      return this.service.createAnnouncement(req.user,dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe({whitelist:true}))
    update( @Param('id', new ParseIntPipe()) id: number, @Body() dto: updateAnnouncement): Promise<JobAnnouncement> {
      for (const [key, value] of Object.entries(dto)) {
        if (value == null) {
            delete dto[key];
        }
      }
      return this.service.update(id, dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('tag/:name')
    createTag(@Param('name') name: string ): Promise<Tag>{
      return this.service.createTag(name);
    }
}
