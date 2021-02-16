import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => User, user => user.files)
  owner: User;

  @OneToOne(() => User)
  profileUser: User;
}