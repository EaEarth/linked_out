import { PaymentSlip } from "../entities/payment/paymentSlip.entity";
import Faker, {fake} from 'faker';
import { define } from "typeorm-seeding";

define(PaymentSlip, (faker: typeof Faker) => {
    const paymentSlip = new PaymentSlip();
    let randomMonth = Math.floor(Math.random()*12)+1;
    paymentSlip.title = "Promoting Job Announcement for "+randomMonth.toString()+" months"
    paymentSlip.amount = randomMonth*10000
    paymentSlip.paymentDate = null

    return paymentSlip;
})