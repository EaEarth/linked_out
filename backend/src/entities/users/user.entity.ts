import { Column, Double, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";
import { IsDate, IsEmail } from 'class-validator';

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    hashedPassword: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    prefix: string;

    @Column()
    firstname: string;
    
    @Column()
    lastname: string;

    @Column("date")
    birthDate: Date;

    @Column()
    address: string;

    @Column("double")
    latitude: Double;

    @Column("double")
    longtitude: Double;

    @Column()
    telNumber: string;

    @Column("timestamp",{default: null})
    vertifyAt: Timestamp;

    @Column({default: null})
    avatarFileId: number;
}
