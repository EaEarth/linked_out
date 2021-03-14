import { IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class updateApplication{

    @IsOptional()
    readonly experience : string;

    @IsOptional()
    readonly education : string;

    @IsOptional()
    readonly feedback: string;

    @IsOptional()
    @IsInt()
    readonly status= 1;

    @IsOptional()
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