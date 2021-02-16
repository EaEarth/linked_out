import { IsInt, IsBoolean, IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';

export class searchAnnouncement{
    @IsOptional()
    readonly search : string;

    @IsOptional()
    @IsArray()
    readonly tag : string[];

    @IsOptional()
    @IsNumber()
    readonly lowerBoundSalary: number;

    @IsOptional()
    readonly province: string;
}