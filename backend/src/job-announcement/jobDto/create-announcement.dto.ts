import { IsInt, IsBoolean, IsNotEmpty, IsEmpty, isInt, IsNumber } from 'class-validator';

export class createAnnouncement{
    @IsNotEmpty()
    readonly tag : string[];

    @IsNotEmpty()
    readonly company : string;

    @IsEmpty()
    readonly ownerId : number;

    @IsNotEmpty()
    @IsNumber()
    readonly lowerBoundSalary: number;

    @IsNotEmpty()
    @IsNumber()
    readonly upperBoundSalary: number;

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

    @IsInt()
    readonly pictureId= 1;
}