import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { Tag } from 'src/entities/job/tag.entity';
import { PaymentSlip } from 'src/entities/payment/paymentSlip.entity';
import { User } from 'src/entities/users/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSlip,User, FileItem]),CaslModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule {}
