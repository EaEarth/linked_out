import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PaymentSlip } from 'src/entities/payment/paymentSlip.entity';
import { createPaymentSlip } from './dto/create-paymentSlip.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users/user.entity';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { FilesService } from 'src/files/files.service';
import { updatePaymentSlip } from './dto/update-paymentSlip.dto';
import { Action } from 'src/policies/action.enum';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentSlip)
        private readonly paymentSlipRepo: Repository<PaymentSlip>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(FileItem)
        private readonly fileRepo: Repository<FileItem>,
        private readonly caslAbilityFactory: CaslAbilityFactory,
    ) { }

    async indexPaymentSlip(): Promise<any> {
        return this.paymentSlipRepo.find();
    }

    async showPaymentSlip(id:number): Promise<PaymentSlip | undefined> {
        return this.paymentSlipRepo.findOneOrFail({where: [{id: id}],relations: ["qrCodeFile","payer"]});
    }

    async createPaymentSlip({payerId ,...dto}: createPaymentSlip): Promise<PaymentSlip | undefined> {
        const paymentSlip = {...new PaymentSlip(), ...dto}
        paymentSlip.payer = await this.userRepo.findOne(payerId);
        paymentSlip.qrCodeFile = await this.getQrCode();
        return this.paymentSlipRepo.save(paymentSlip);
    }

    async updatePaymentSlip(id:number,user:User ,{payerId ,qrCodeFileId ,...dto}: updatePaymentSlip): Promise<PaymentSlip> {
        // Authorization still doesn't get set up because inability to mock back account
        let slip = await this.paymentSlipRepo.findOneOrFail(id);
        const updatedPaymentSlip = {...(slip),...dto};
        if(payerId){
            updatedPaymentSlip.payer = await this.userRepo.findOneOrFail(payerId);
        }
        if(qrCodeFileId){
            updatedPaymentSlip.qrCodeFile = await this.fileRepo.findOneOrFail(qrCodeFileId);
        }
        this.paymentSlipRepo.save(updatedPaymentSlip);
        return this.paymentSlipRepo.findOneOrFail({where: [{id:id}],relations: ["qrCodeFile","payer"]});
    }

    async indexUserPaymentSlip(id:number): Promise<PaymentSlip[]> {
        let user = await this.userRepo.findOne({where: [{id: id}],relations: ["paymentSlips"]})
        return user.paymentSlips
    }

    private async getQrCode(): Promise<FileItem | undefined> {
        const qrCodeFile = this.fileRepo.findOne({title: "qr_code_payment"});
        return qrCodeFile
    }

}
