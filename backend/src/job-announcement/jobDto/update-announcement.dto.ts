import { IsInt, IsBoolean, IsNotEmpty, IsOptional, isInt } from 'class-validator';

export class updateAnnouncement{

    @IsOptional()
    readonly title : string;

    @IsOptional()
    readonly description : string;

    @IsOptional()
    readonly tag : string;

    @IsOptional()
    readonly company : string;

    @IsOptional()
    readonly position: string;

    @IsOptional()
    readonly address: string;

    @IsOptional()
    readonly province: string;

    @IsOptional()
    @IsInt()
    readonly ownerId : number;

    @IsOptional()
    @IsInt()
    readonly lowerSalary: number;

    @IsOptional()
    @IsInt()
    readonly upperSalary: number;

    @IsOptional()
    @IsBoolean()
    readonly isPublished: boolean;

    @IsOptional()
    @IsInt()
    readonly amountRequired: number;
}