import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { FilesController } from './files.controller';
import { MulterImport } from './files.imports';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileItem]),MulterImport,CaslModule],
  controllers: [FilesController],
  providers: [FilesService],
})

export class FilesModule {}
