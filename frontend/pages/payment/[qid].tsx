import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row, } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { Router, useRouter } from 'next/router'
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/stores';
import { GetServerSidePropsContext } from 'next';
import payment from '../../models/payment/payment';

export const paymentSlip: React.FC<any> = (props) => {
    const router = useRouter();
    const [paymentSlip] = useState(props.paymentSlip);

    const handleNextClick = (e) => {
        e.preventDefault();
        const payload = {
            paymentDate: dayjs().format(),
        };
        axios.patch(`payment/slip/${paymentSlip.id}`,
            payload
        ).then((res) => {
            if (res.status === 200) {
                router.push(`successful/${paymentSlip.id}`);
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Payment Slip</title>
            </Head>
            <Container className="my-4">
                <Row className='justify-content-center'>
                    <h1>Payment Slip</h1>
                </Row>
                <Row className="mt-3 justify-content-center">
                    <Col md={{ span: 8, offset: 2 }}>
                        <Row className="my-2">
                            <Col md={{ span: 2 }}><h5>Title</h5></Col>
                            <Col className=""><h5>{paymentSlip.title}</h5></Col>
                        </Row>
                        <Row className="my-2">
                            <Col md={{ span: 2 }}><h5>Price</h5></Col>
                            <Col className=""><h5>{paymentSlip.amount} Baht</h5></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <Image src={paymentSlip.qrCodeFile?.path || '/images/company/solus.png'}
                            width="300"
                            height="300"
                            layout="intrinsic"
                            className='d-block w-75' />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <button type="button" className="my-2 btn btn-primary btn-lg" onClick={handleNextClick} disabled={paymentSlip.paymentDate}>
                        Next</button>
                </Row>
            </Container>
        </DefaultLayout >
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const qid = context.params.qid;
    const { data } = await axios.get<payment>(
        `payment/slip/${qid}`);
    return {
        props: {
            paymentSlip: data,
        }
    }
}

export default paymentSlip;