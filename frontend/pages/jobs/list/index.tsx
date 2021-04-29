import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import JobAnnouncementGrid from '../../../components/JobAnnouncement/GridCopy';
import JobPagination from '../../../components/JobAnnouncement/Pagination';
import TagList from '../../../components/JobAnnouncement/TagList';
import DefaultLayout from '../../../layouts/Default';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import JobAnnouncement from '../../../models/job/JobAnnouncement';

export const lists: React.FC<any> = (props) => {
  const router = useRouter();
  // Data
  //const [tags] = useState(props.tags || []);
  const [jobs, setJobs] = useState(props.jobs || []);
  // Pagination state
  const [pageLen, setPageLen] = useState(1);
  const page = (Number.parseInt(router.query.page as string) || 1) - 1;
  const perPage = 4;
  // On page change
  const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
    e.preventDefault();
    if (pageNo >= 0 && pageNo <= pageLen)
      router.push(`/jobs/list?page=${pageNo}`, undefined, { shallow: true });
  };
  useEffect(() => {
    setJobs(props.jobs);
  }, [jobs]);
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
          <Col md={1}>
            <button
              type="button"
              className="my-2 btn btn-primary"
              onClick={() => {
                router.push('/jobs/register');
              }}>
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
    </DefaultLayout>
  );
};
export async function getServerSideProps(context) {
  const cookie = context.req.cookies;
  const { data } = await axios.get<JobAnnouncement[]>('/job/owner', {
    headers: {
      Cookie: `jwt=${cookie['jwt']}`,
    },
  });

  return {
    props: {
      jobs: data,
    },
  };
}

export default lists;
