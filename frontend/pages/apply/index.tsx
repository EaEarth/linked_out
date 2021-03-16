import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import JobApplyGrid from '../../components/JobApply/Grid';
import JobPagination from '../../components/JobAnnouncement/Pagination';
import TagList from '../../components/JobAnnouncement/TagList';
import DefaultLayout from '../../layouts/Default';
import axios from 'axios';
import ApplicationForm from '../../models/ApplicationForm/ApplicationForm';
import { GetServerSidePropsContext } from 'next';


export const ApplicationList: React.FC<any> = (props) => {
    const router = useRouter();
    // Data
    const [application, setApplication] = useState(props.application || []);
    // Pagination state
    const [pageLen, setPageLen] = useState(1);
    const page = (Number.parseInt(router.query.page as string) || 1) - 1;
    const perPage = 4;
    // On page change
    const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
        e.preventDefault();
        if (pageNo >= 0 && pageNo <= pageLen)
            router.push(
                { href: '/apply', query: { ...router.query, page: pageNo } },
                undefined,
                {
                    shallow: true,
                }
            );
    };

    useEffect(() => {
        setApplication(props.application);
    }, [router.asPath]);

    // Update page length
    useEffect(() => {
        setPageLen(Math.ceil(application.length / perPage));
    }, [application]);
    // Render
    return (
        <DefaultLayout>
            <Head>
                <title>Apply List</title>
            </Head>
            <Container className="mt-4">
                <JobApplyGrid
                    applications={application.slice(page * perPage, (page + 1) * perPage)}
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
    const { data } = await axios.get<ApplicationForm[]>(
        '/job-application/applicant',
        {
            headers: {
                Cookie: `jwt=${cookie['jwt']}`,
            },
        }
    );

    return {
        props: {
            application: data,
        },
    };
}

export default ApplicationList;
