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
      <Jumbotron className={`${styles['container']} d-flex align-items-center`}>
        <Container>
          <Row className="">
            <Col className="">
              <h1 className="font-weight-bold">Welcome! to</h1>
              <h1 className="font-weight-bold">Linked Out</h1>
              <h2 className="">Find your dream job</h2>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="d-block">
          <h3>Recommend Jobs</h3>
          <JobAnnouncementGrid
            jobs={jobs}
          />
        </Row>

      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = context.req.cookies;
  const recommendJobs = await axios.get<JobAnnouncement[]>(`/job/user/recommendation`, {
    headers: {
      Cookie: `jwt=${cookie['jwt']}`,
    },
  }).catch((err) => {
    console.log(err)
  });
  if (!recommendJobs) {

  }

  return {
    props: {
      job: recommendJobs ? recommendJobs.data : [],
    }
  }
}

export default Home;
