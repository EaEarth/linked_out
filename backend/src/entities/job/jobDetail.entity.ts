import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { JobAnnouncement } from './jobAnnouncement.entity';

@Entity()
export class JobDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  amountRequired: number;

  @OneToOne(type => JobAnnouncement, jobAnnouncement => jobAnnouncement.jobDetail)
  jobAnnouncement: JobAnnouncement;

}