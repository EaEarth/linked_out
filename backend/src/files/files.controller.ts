import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createFile } from './dto/create-file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Body() dto: createFile, @Request() req) {
    return this.fileService.createFile(req, dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('index')
  async index(@Request() req, @Param('fileId') fileId: number) {
    return this.fileService.index(req.user);
  }

  @Get('id/:fileId')
  async findById(@Param('fileId') fileId: number) {
    return this.fileService.findById(fileId);
  }

  @Get(':fileName')
  async serveFile(@Param('fileName') fileName: string, @Res() res) {
    return this.fileService.serveStatic(fileName, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('title/:fileTitle')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findByTitle(@Request() req, @Param('fileTitle') fileTitle: string) {
    return this.fileService.findByTitle(req.user, fileTitle);
  }
}
