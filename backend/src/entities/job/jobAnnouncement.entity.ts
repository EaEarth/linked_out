import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { JobDetail } from "./jobDetail.entity"

@Entity()
export class JobAnnouncement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  tag: string;

  @Column()
  description: string;

  @Column()
  company: string;

  @Column()
  ownerId: number;

  @Column()
  salary: number;

  @Column()
  position: string;

  @Column({ default: true })
  isPublished: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => JobDetail, jobDetail => jobDetail.jobAnnouncement)
  @JoinColumn()
  jobDetail: JobDetail;

}