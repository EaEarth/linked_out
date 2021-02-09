import { Column, Double, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { IsDate, IsEmail } from 'class-validator';

@Entity()
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

    @Column()
    birthDate: Timestamp;

    @Column()
    address: string;

    @Column()
    latitude: Double;

    @Column()
    longtitude: Double;

    @Column()
    telCountryCode: string;

    @Column()
    telNumber: string;

    @Column()
    vertifyAt: Timestamp;

    @Column()
    avatarFileId: number;
}
