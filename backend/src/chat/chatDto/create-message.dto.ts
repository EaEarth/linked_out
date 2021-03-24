import { IsNotEmpty, IsNumber } from "class-validator";


export class createMessage{
    @IsNotEmpty()
    @IsNumber()
    readonly chatRoomId: number;

    @IsNotEmpty()
    readonly message: string;
}