import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsEmpty, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Length } from "class-validator";
import { FileItem } from "src/entities/files/fileItem.entity";
import { JobAnnouncement } from "src/entities/job/jobAnnouncement.entity";
import { Double } from "typeorm";

export class createUser{
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    hashedPassword: string;

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

    @IsEmpty()
    jobAnnouncement : JobAnnouncement[];
}