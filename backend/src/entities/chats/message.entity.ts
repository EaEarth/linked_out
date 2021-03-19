import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ChatRoom } from './chatRoom.entity';

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type:"longtext"})
    message: string;

    @ManyToOne(() => User, sender => sender.messages)
    sender: User;

    @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages, {
        onDelete: "CASCADE"
    })
    chatRoom: ChatRoom;

    @CreateDateColumn()
    createdAt: Date;
}