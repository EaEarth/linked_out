import { Column, Double, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";
import { IsDate, IsEmail } from 'class-validator';
import { JobAnnouncement } from "../job/jobAnnouncement.entity";
import { FileItem } from "../files/fileItem.entity";
import { JobApplication } from "../job/jobApplication.entity";
import { Tag } from "../job/tag.entity";

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    hashedPassword: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    prefix: string;

    @Column()
    firstname: string;
    
    @Column()
    lastname: string;

    @Column("date")
    birthDate: Date;

    @Column()
    address: string;

    @Column("double")
    latitude: Double;

    @Column("double")
    longtitude: Double;

    @Column()
    telNumber: string;

    @Column("date",{default: null})
    vertifyAt: Date;

    @Column({default: false})
    isAdmin: boolean;

    @Column()
    province: string;

    @OneToOne(() => FileItem)
    @JoinColumn()
    avatarFile: FileItem;

    @OneToMany(() => JobAnnouncement, jobAnnouncement => jobAnnouncement.owner)
    jobAnnouncements: JobAnnouncement[];

    @OneToMany(() => FileItem, FileItem => FileItem.owner)
    files: FileItem[];
    
    @OneToMany(() => JobApplication, jobApplication => jobApplication.applicant)
    jobApplication: JobApplication[];

    @ManyToMany(() => Tag, Tag => Tag.users)
    @JoinTable()
    tags: Tag[];
}
