import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class createAnnouncement{
    @IsNotEmpty()
    readonly tag : string[];

    @IsNotEmpty()
    readonly company : string;

    @IsNotEmpty()
    @IsInt()
    readonly ownerId : number;

    @IsNotEmpty()
    @IsInt()
    readonly lowerSalary: number;

    @IsNotEmpty()
    @IsInt()
    readonly upperSalary: number;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isPublished: boolean;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly province: string;

    @IsInt()
    readonly amountRequired: number;
}