import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { User } from 'src/entities/users/user.entity';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {  JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User,FileItem]),forwardRef(() => AuthModule),ConfigModule,CaslModule,FilesModule],
  providers: [UsersService,FilesService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
