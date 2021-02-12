import { IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class createAnnouncement{
    @IsNotEmpty()
    readonly title : string;

    @IsNotEmpty()
    readonly description : string;

    readonly tag : string;

    @IsNotEmpty()
    readonly company : string;

    @IsNotEmpty()
    readonly ownerId : number;

    @IsNotEmpty()
    @IsInt()
    readonly salary: number;

    @IsNotEmpty()
    readonly position: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly isPublished: boolean;

    // For creating detail
    @IsNotEmpty()
    readonly detailDescription: string;

    @IsNotEmpty()
    readonly address: string;

    @IsInt()
    readonly amountRequired: number;
}