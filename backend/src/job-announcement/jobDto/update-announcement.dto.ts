import { IsInt, IsBoolean, IsNotEmpty, IsOptional, isInt, IsNumber } from 'class-validator';

export class updateAnnouncement{

    @IsOptional()
    readonly title : string;

    @IsOptional()
    readonly description : string;

    @IsOptional()
    readonly tag : string[];

    @IsOptional()
    readonly company : string;

    @IsOptional()
    readonly position: string;

    @IsOptional()
    readonly address: string;

    @IsOptional()
    readonly province: string;

    @IsOptional()
    @IsNumber()
    readonly lowerBoundSalary: number;

    @IsOptional()
    @IsNumber()
    readonly upperBoundSalary: number;

    @IsOptional()
    @IsBoolean()
    readonly isPublished: boolean;

    @IsOptional()
    @IsInt()
    readonly amountRequired: number;

    @IsOptional()
    @IsInt()
    readonly pictureId= 1;
}