import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, } from 'react-bootstrap';
import DefaultLayout from '../layouts/Default';
import JobAnnouncementGrid from '../components/Homepage/Grid';
import styles from '../components/Homepage/homepage.module.scss';
import JobAnnouncement from '../models/job/JobAnnouncement';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';

export const Home = (props) => {
  const [jobs, setJobs] = useState(props.job);
  return (
    <DefaultLayout>
      <Head>
        <title>LinkedOut</title>
      </Head>
      <Container >
        <Row className={`d-block ${styles['container']}`} >
          <h1 className="text-center font-weight-bold">Welcome! to Linked Out</h1>
          <h2 className="text-center">Find your dream job</h2>
        </Row>
        <JobAnnouncementGrid
          jobs={jobs}
        />
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = context.req.cookies;
  const { data } = await axios.get<JobAnnouncement[]>(`/job/user/recommendation`, {
    headers: {
      Cookie: `jwt=${cookie['jwt']}`,
    },
  });
  return {
    props: {
      job: data
    }
  }
}

export default Home;
