import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly fileService: FilesService 
    ) {}
    
    
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file,@Request() req){
        console.log(file);
        return this.fileService.createFile(req,file);
    }

    @UseGuards(JwtAuthGuard)
    @Get('index')
    async index(@Request() req,@Param("fileId") fileId: number) {
        return this.fileService.index(req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('id/:fileId')
    async findById(@Param("fileId") fileId: number) {
        return this.fileService.findById(fileId);
    }

    @Get(':fileId')
    async serveFile(@Param("fileId") fileId: string, @Res() res) {
        return this.fileService.serveStatic(fileId, res);
    }

    @UseGuards(JwtAuthGuard)
    @Get('title/:fileTitle')
    async findByTitle(@Param("fileTitle") fileTitle: string) {
        return this.fileService.findByTitle(fileTitle);
    }

}
