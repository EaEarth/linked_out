import React from 'react';
import { Col, Row } from 'react-bootstrap';
import payment from '../../models/payment/payment';
import PaymentCard from './Card';

export type PaymentGridProps = {
    payments: Partial<payment>[];
};

export const PaymentGrid: React.FC<PaymentGridProps> = ({
    payments,
}) => {
    const rows = [];
    for (let i = 0; i < payments.length; i++) {
        rows.push(
            <Row key={i} className="my-4">
                {i < payments.length && (
                    <Col>
                        <PaymentCard key={i} {...payments[i]} />
                    </Col>
                )}
            </Row >
        );
    }
    return <>{rows}</>;
};

export default PaymentGrid;
