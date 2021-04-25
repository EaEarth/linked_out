import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { FileItem } from '../files/fileItem.entity';
import { User } from '../users/user.entity';

@Entity()
export class PaymentSlip{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    amount: number;

    @Column("date",{default: null})
    paymentDate: Date;

    @ManyToOne(() => FileItem, qrCodeFile => qrCodeFile.paymentSlips)
    qrCodeFile: FileItem;

    @ManyToOne(() => User, payer => payer.paymentSlips)
    payer: User;

}