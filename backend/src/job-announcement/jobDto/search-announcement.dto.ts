import { IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class searchAnnouncement{
    @IsOptional()
    readonly tag : string;

    @IsOptional()
    readonly company : string;

    @IsOptional()
    @IsInt()
    readonly lowerSalary: number;

    @IsOptional()
    readonly title: string;

    @IsOptional()
    readonly province: string;
}