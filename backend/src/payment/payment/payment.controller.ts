import { Controller, Get, UseGuards, UsePipes, ValidationPipe, Request, Param, ParseIntPipe, Post, Body, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaymentSlip } from 'src/entities/payment/paymentSlip.entity';
import { createPaymentSlip } from './dto/create-paymentSlip.dto';
import { updatePaymentSlip } from './dto/update-paymentSlip.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly service: PaymentService) { }

    @Get('slip/index')
    async indexPaymentSlip() : Promise<PaymentSlip[]> {
        return this.service.indexPaymentSlip();
    }

    @Get('slip/:id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async getPaymentSlipById(@Param('id', new ParseIntPipe()) id: number) : Promise<PaymentSlip> {
        return this.service.showPaymentSlip(id);
    }

    @Post('slip')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createPaymentSlip(@Request() req ,@Body() dto:createPaymentSlip) : Promise<PaymentSlip> {
        dto.payerId = req.user.id
        return this.service.createPaymentSlip(dto);
    }

    @Patch('slip/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updatePaymentSlip(@Param('id', new ParseIntPipe()) id: number, @Request() req,@Body() dto:updatePaymentSlip) : Promise<PaymentSlip> {
        return this.service.updatePaymentSlip(id,req.user,dto);
    }
    
    @Get('slip')
    @UseGuards(JwtAuthGuard)
    async getPaymentSlipByUser(@Request() req) : Promise<PaymentSlip[]> {
        return this.service.indexUserPaymentSlip(req.user.id);
    }


}
