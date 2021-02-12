import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { JobAnnouncement } from './jobAnnouncement.entity';

@Entity()
export class Tag{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToMany(() => JobAnnouncement, jobAnnouncement => jobAnnouncement.tags)
    jobAnnouncements: JobAnnouncement[];
}