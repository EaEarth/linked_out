import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEmpty, IsLatitude, IsLongitude, IsNotEmpty, IsNumberString, IsOptional, Length } from "class-validator";
import { type } from "os";
import { JobAnnouncement } from "src/entities/job/jobAnnouncement.entity";
import { Tag } from "src/entities/job/tag.entity";
import { Double } from "typeorm";

export class createUser{
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    prefix: string;

    @IsNotEmpty()
    firstname: string;
    
    @IsNotEmpty()
    lastname: string;

    @Type(()=>Date)
    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: Double;

    @IsNotEmpty()
    @IsLongitude()
    longtitude: Double;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    telNumber: string;

    @IsEmpty()
    vertifyAt: Date;

    @IsOptional()
    avatarFileId: number;

    @IsEmpty()
    isAdmin: boolean;

    @IsNotEmpty()
    province: string;

    @IsOptional()
    tags: string[];

    @IsEmpty()
    jobAnnouncement : JobAnnouncement[];
}