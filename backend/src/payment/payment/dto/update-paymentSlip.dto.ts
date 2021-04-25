import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";


export class updatePaymentSlip{
    
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly title : string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly amount : number;

    @Type(()=>Date)
    @IsOptional()
    @IsDate()
    readonly paymentDate: Date;

    @IsEmpty()
    readonly payerId : number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly qrCodeFileId: number;

}