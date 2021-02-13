import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsEmpty, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsNumberString, Length } from "class-validator";
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

    @IsEmpty()
    avatarFileId: number;


}