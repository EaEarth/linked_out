import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobAnnouncement } from "../job/jobAnnouncement.entity";
import { User } from "../users/user.entity";

@Entity()
export class FileItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @ManyToOne(() => User, user => user.avatarFiles)
  owner: User;

  @OneToMany(type => JobAnnouncement, jobAnnouncements => jobAnnouncements.picture)
  jobAnnouncements: JobAnnouncement[];
}