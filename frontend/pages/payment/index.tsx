import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import JobPagination from '../../components/JobAnnouncement/Pagination';
import PaymentGrid from '../../components/payment/Grid';
import payment from '../../models/payment/payment';

export const paymentList: React.FC<any> = (props) => {
    const router = useRouter();
    // Data
    const [payments, setPayment] = useState(props.payment || []);
    // Pagination state
    const [pageLen, setPageLen] = useState(1);
    const page = (Number.parseInt(router.query.page as string) || 1) - 1;
    const perPage = 4;
    // On page change
    const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
        e.preventDefault();
        if (pageNo >= 0 && pageNo <= pageLen)
            router.push(
                { href: '/payment', query: { ...router.query, page: pageNo } },
                undefined,
                {
                    shallow: true,
                }
            );
    };

    useEffect(() => {
        setPayment(props.payment);
    }, [router.asPath]);

    // Update page length
    useEffect(() => {
        setPageLen(Math.ceil(payments.length / perPage));
    }, [payments]);
    // Render
    return (
        <DefaultLayout>
            <Head>
                <title>Payment List</title>
            </Head>
            <Container className="mt-4">
                <h1 className="text-center my-3">Payment List</h1>
                <PaymentGrid
                    payments={payments.slice(page * perPage, (page + 1) * perPage)}
                />
                <JobPagination
                    page={page}
                    pageLength={pageLen}
                    onPageChange={goToPage}
                />
            </Container>
        </DefaultLayout>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookie = context.req.cookies;
    const { data } = await axios.get<payment[]>(
        'payment/slip',
        {
            headers: {
                Cookie: `jwt=${cookie['jwt']}`,
            },
        }
    );

    return {
        props: {
            payment: data,
        },
    };
}

export default paymentList;
