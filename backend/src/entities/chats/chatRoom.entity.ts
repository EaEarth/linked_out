import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { JobAnnouncement } from '../job/jobAnnouncement.entity';
import { User } from '../users/user.entity';
import { Message } from './message.entity';

@Entity()
export class ChatRoom{
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToMany(() => Message, message => message.chatRoom)
    messages: Message[];

    @ManyToOne(() => JobAnnouncement, jobAnnouncement => jobAnnouncement.chatRooms)
    jobAnnouncement: JobAnnouncement;

    @ManyToOne(() => User, recruiter => recruiter.ownChatRooms, {
        onDelete: "CASCADE"
    })
    recruiter: User;

    @ManyToOne(() => User, applicant => applicant.joinChatRooms, {
        onDelete: "CASCADE"
    })
    applicant: User;
}