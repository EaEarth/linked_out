import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import JobAnnouncementGrid from '../../components/JobAnnouncement/GridCopy';
import JobPagination from '../../components/JobAnnouncement/Pagination';
import TagList from '../../components/JobAnnouncement/TagList';
import DefaultLayout from '../../layouts/Default';
import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
const mockJobs = [
    {
        id: 0,
        role: 'Programmer',
        createdAt: '1 day ago',
        location: 'Bangkok, Thailand',
        companyName: 'Wongnai',
        image: '/images/company/wongnai.jpg',
    },
    {
        id: 1,
        role: 'Full-stack Developer',
        createdAt: '4 hours ago',
        location: 'Bangkok, Thailand',
        companyName: 'Wongnai',
        image: '/images/company/wongnai.jpg',
    },
    {
        id: 2,
        role: 'Backend Developer',
        createdAt: '3 weeks ago',
        location: 'Bangkok, Thailand',
        companyName: 'Thinknet',
        image: '/images/company/wongnai.jpg',
    },

    {
        id: 3,
        role: 'Web Developer',
        createdAt: '11 hours ago',
        location: 'Bangkok, Thailand',
        companyName: 'Skooldio',
        image: '/images/company/wongnai.jpg',
    },
];

const mockTags = [
    { name: 'โปรแกรมเมอร์' },
    { name: 'แพทย์' },
    { name: 'การตลาด' },
    { name: 'บัญชี' },
];

export const lists: React.FC<any> = (props) => {
    const router = useRouter();
    // Data
    const [tags] = useState(props.tags || []);
    const [jobs] = useState(props.jobs || []);
    // Pagination state
    const [pageLen, setPageLen] = useState(1);
    const page = (Number.parseInt(router.query.page as string) || 1) - 1;
    const perPage = 4;
    // On page change
    const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
        e.preventDefault();
        if (pageNo >= 0 && pageNo <= pageLen)
            router.push(`/jobs?page=${pageNo}`, undefined, { shallow: true });
    };
    // Update page length
    useEffect(() => {
        setPageLen(Math.ceil(jobs.length / perPage));
    }, [jobs]);
    // Render
    return (
        <DefaultLayout>
            <Head>
                <title>Job List</title>
            </Head>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <TagList tags={tags} />
                    </Col>
                    <Col md={1}>
                        <button type="button" className="my-2 btn btn-primary"
                            onClick={() => { router.push('/editJobDetail/' + props.jobs.length.toString()) }}>
                            Create
                        </button>
                    </Col>

                </Row>




                <JobAnnouncementGrid
                    jobs={jobs.slice(page * perPage, (page + 1) * perPage)}

                />
                <JobPagination
                    page={page}
                    pageLength={pageLen}
                    onPageChange={goToPage}
                />
            </Container>
        </DefaultLayout >
    );
};
export async function getServerSideProps(context) {
    // TODO: Fetch from backend
    return {
        props: {
            jobs: mockJobs,
            tags: mockTags,
        },
    };
}

export default lists;
