import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { FileItem } from '../files/fileItem.entity'
import { JobAnnouncement } from './jobAnnouncement.entity';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"longtext", nullable: true})
  experience: string;

  @Column({type:"longtext", nullable: true})
  education: string;

  @Column({type:"longtext", nullable: true})
  feedback: string;

  @Column({default : 1})
  status: number; //1 = waiting, 2= accepted, 3=denied

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, applicant => applicant.jobApplication)
  applicant: User;

  @OneToOne(() => FileItem)
  @JoinColumn()
  resume: FileItem;

  @OneToOne(() => FileItem)
  @JoinColumn()
  coverLetter: FileItem;

  @OneToOne(() => FileItem)
  @JoinColumn()
  transcript: FileItem;

  @ManyToOne(() => JobAnnouncement, jobAnnouncement => jobAnnouncement.application)
  jobAnnouncement: JobAnnouncement;
}