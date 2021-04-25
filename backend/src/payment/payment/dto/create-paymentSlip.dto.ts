import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, Min, MinLength } from "class-validator";


export class createPaymentSlip{
    
    @IsNotEmpty()
    @MinLength(1)
    readonly title : string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly amount : number;

    @IsEmpty()
    readonly paymentDate: Date;

    @IsEmpty()
    payerId : number;

    @IsEmpty()
    readonly qrCodeFileId: number;

}