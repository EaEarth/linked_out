import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row, FormControl } from 'react-bootstrap';
import DefaultLayout from '../../../layouts/Default';
import Image from 'next/image';
import axios from 'axios';
import { Router, useRouter } from 'next/router'
import dayjs from 'dayjs';
import { GetServerSidePropsContext } from 'next';
import payment from '../../../models/payment/payment';

export const paymentSlip: React.FC<any> = (props) => {
    const router = useRouter();
    const [paymentSlip] = useState(props.paymentSlip);

    return (
        <DefaultLayout>
            <Head>
                <title>Payment Slip</title>
            </Head>

            <Container className="my-4">
                <Row className='justify-content-center'>
                    <h1>Payment Successful</h1>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor"
                            className="bi bi-bag-check text-primary" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-center">
                    <Col md={{ span: 8, offset: 2 }}>
                        <Row className="my-2">
                            <Col md={{ span: 3 }}><h5>Title</h5></Col>
                            <Col className=""><h5>{paymentSlip.title}</h5></Col>
                        </Row>
                        <Row className="my-2">
                            <Col md={{ span: 3 }}><h5>Price</h5></Col>
                            <Col className=""><h5>{paymentSlip.amount} Baht</h5></Col>
                        </Row>
                        <Row className="my-2">
                            <Col md={{ span: 3 }}><h5>Paid Date</h5></Col>
                            <Col className=""><h5>{dayjs(paymentSlip.paymentDate).format('D MMM YYYY h:mm a')}</h5></Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <button type="button" className="my-2 btn btn-primary" onClick={() => router.push('/payment')}>Return To Payment List</button>
                </Row>
            </Container>

        </DefaultLayout >
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const sid = context.params.sid;
    const { data } = await axios.get<payment>(
        `payment/slip/${sid}`);
    if (data.paymentDate == null) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    return {
        props: {
            paymentSlip: data,
        }
    }
}

export default paymentSlip;