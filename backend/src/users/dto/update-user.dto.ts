import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Length } from "class-validator";
import { Double, Timestamp } from "typeorm";

export class updateUser{
    
    @IsOptional()
    hashedPassword: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    prefix: string;

    @IsOptional()
    firstname: string;
    
    @IsOptional()
    lastname: string;

    @Type(()=>Date)
    @IsNotEmpty()
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
    @IsNumber()
    avatarFileId: number;
}