import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobApplication } from 'src/entities/job/jobApplication.entity';
import { createApplication } from './dto/create-application.dto';
import { updateApplication } from './dto/update-application.dto';
import { JobApplicationService } from './job-application.service';

@Controller('job-application')
export class JobApplicationController {

  constructor(private readonly service: JobApplicationService) {}

  @Get('index')
  indexGet(): Promise<JobApplication[]> {
    return this.service.index();
  }

  @Get('index/:id')
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<JobApplication> {
    return this.service.findById(id);
  }

  @Get('applicant')
  @UseGuards(JwtAuthGuard)
  indexFromApplicant(@Request() req): Promise<JobApplication[]> {
    return this.service.findFromApplicant(req.user.id);
  }

  @Get('recruiter')
  @UseGuards(JwtAuthGuard)
  indexFromRecruiter(@Request() req): Promise<JobApplication[]> {
    return this.service.findFromRecruiter(req.user.id);
  }

  @Get('announcement/:id')
  @UseGuards(JwtAuthGuard)
  indexFromAnnouncement( @Param('id', new ParseIntPipe()) id: number): Promise<JobApplication[]> {
    return this.service.findFromAnnouncement(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(
    @Request() req,
    @Body() dto: createApplication,
  ): Promise<JobApplication> {
    return this.service.createJobApplication(req.user, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: updateApplication,
  ): Promise<JobApplication> {
    return this.service.updateJobApplication(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Request() req,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<JobApplication> {
    return this.service.delete(req.user, id);
  }

}
