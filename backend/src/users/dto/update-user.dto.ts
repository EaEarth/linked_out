import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Length } from "class-validator";
import { FileItem } from "src/entities/files/fileItem.entity";
import { Double, Timestamp } from "typeorm";

export class updateUser{
    @IsOptional()
    id: number;

    @IsOptional()
    password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    prefix: string;

    @IsOptional()
    firstname: string;
    
    @IsOptional()
    lastname: string;

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    birthDate: Date;

    @IsOptional()
    address: string;

    @IsOptional()
    @IsLatitude()
    latitude: Double;

    @IsOptional()
    @IsLongitude()
    longtitude: Double;

    @IsOptional()
    @IsNumberString()
    @Length(10)
    telNumber: string;
    
    @IsOptional()
    avatarFileId: number;

    @IsOptional()
    isAdmin: boolean;
}