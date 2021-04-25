export interface Payment {
    id: number;
    title: string;
    amount: number;
    paymentDate: string;
    payer?: Partial<{
        id: number;
        email: string;
        prefix: string;
        firstname: string;
        lastname: string;
        birthDate: string;
        address: string;
        telNumber: string;
        province: string;
    }>;
    qrCodeFile?: Partial<{
        id: number;
        title: string;
        type: string;
        path: string;
    }>;
}

export default Payment;