import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Tag } from './tag.entity';

@Entity()
export class JobAnnouncement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  pictureId: number; 

  @Column()
  lowerBoundSalary: number;

  @Column()
  upperBoundSalary: number;

  @Column({ default: true })
  isPublished: boolean;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  province: string;

  @Column()
  amountRequired: number;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Tag, tag => tag.jobAnnouncements)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, owner => owner.jobAnnouncements)
  owner: User;

}