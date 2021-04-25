import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import payment from '../../models/payment/payment';
import style from './payment.module.scss';
import dayjs from 'dayjs';

export type PaymentCardProps = Partial<payment>;

export const PaymentCard: React.FC<PaymentCardProps> = (
    props
) => {
    const router = useRouter();
    return (
        <a
            href={props.id ? `/payment/${props.id}` : undefined}
            className={`${style['custom-a']}`}
            onClick={(e) => e.preventDefault()}
        >
            <Card className={`${style['grid']} rounded mx-auto col-md-7`}
                onClick={() => {
                    if (props.id && !props.paymentDate) router.push(`/payment/${props.id}`);
                    else if (props.paymentDate) router.push(`/payment/successful/${props.id}`);
                }}
            >
                <Card.Body>
                    <Row noGutters className="align-items-center my-2 mx-2">
                        <Col md={{ span: 2 }} className="font-weight-bolder">
                            Title
                    </Col>
                        <Col className="">
                            {props.title}
                        </Col>
                    </Row>
                    <Row noGutters className="align-items-center mb-2 mx-2">
                        <Col md={{ span: 2 }} className="font-weight-bolder">
                            Price
                    </Col>
                        <Col className="">
                            {props.amount} Baht
                    </Col>
                    </Row>
                    <Row noGutters className="align-items-center mb-2 mx-2">
                        <Col md={{ span: 2 }} className="font-weight-bolder">
                            Paid At
                    </Col>
                        <Col className={props.paymentDate ? 'text-success' : ''}>
                            {props.paymentDate ? dayjs(props.paymentDate).format('D MMM YYYY h:mm a') : 'Not Paid'}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </a >
    );
};

export default PaymentCard;
