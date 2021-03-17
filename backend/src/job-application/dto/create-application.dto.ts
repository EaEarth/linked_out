import { IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class createApplication{

    @IsOptional()
    readonly experience = "";

    @IsOptional()
    readonly education = "";

    @IsOptional()
    readonly feedback= "";

    @IsInt()
    @Min(1)
    readonly status= 1;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    readonly jobAnnouncementId: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    readonly resumeId: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    readonly transcriptId: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    readonly coverLetterId: number;
}