import { IsNotEmpty, IsNumber } from "class-validator";


export class createChatRoom{
    @IsNotEmpty()
    @IsNumber()
    readonly applicantId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly jobAnnouncementId: number;
}