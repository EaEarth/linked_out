import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { JobAnnouncement } from './jobAnnouncement.entity';

@Entity()
export class Tag{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToMany(() => JobAnnouncement, jobAnnouncement => jobAnnouncement.tags)
    jobAnnouncements: JobAnnouncement[];

    @ManyToMany(() => User, User => User.tags)
    users: User[];
}