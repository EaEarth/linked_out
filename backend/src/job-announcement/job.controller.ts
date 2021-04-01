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
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-auth.guard';

@Controller('job')
export class JobController {
  constructor(private readonly service: JobService) { }

  @Get('index')
  async indexGet(): Promise<JobAnnouncement[]> {
    return this.service.index();
  }

  @Get('indexAll')
  async indexGetAll(): Promise<JobAnnouncement[]> {
    return this.service.indexAll();
  }

  @Get('owner')
  @UseGuards(JwtAuthGuard)
  async indexFromOwner(@Request() req): Promise<JobAnnouncement[]> {
    return this.service.findFromOwner(req.user.id);
  }

  @Get('tag/index')
  async indexTag(): Promise<Tag[]> {
    return this.service.indexTag();
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async searchGet(@Body() dto: searchAnnouncement): Promise<JobAnnouncement[]> {
    let qb = this.service.search(dto);
    return qb.getMany();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Request() req,
    @Body() dto: createAnnouncement,
  ): Promise<JobAnnouncement> {
    return this.service.createAnnouncement(req.user, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Request() req,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: updateAnnouncement,
  ): Promise<JobAnnouncement> {
    for (const [key, value] of Object.entries(dto)) {
      if (value == null || value === '') {
        delete dto[key];
      }
    }
    return this.service.update(req.user, id, dto);
  }

  @Get('index/:id')
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<JobAnnouncement> {
    return this.service.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<JobAnnouncement> {
    return this.service.softDelete(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('tag/:name')
  async createTag(@Param('name') name: string): Promise<Tag> {
    return this.service.createTag(name);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('user/recommendation')
  async recommended(@Request() req): Promise<JobAnnouncement[]> {
    if (req.user) return this.service.recommendedJob(req.user.id);
    else return this.service.defaultRecommendation();
  }
}
