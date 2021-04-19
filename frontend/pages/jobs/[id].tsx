import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios, { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isServerReq, makeServerAxios } from '../../utils/request';
import { useAsync } from 'react-use';

export const JobDetails = (props) => {
  const [jobDetails, setJobDetails] = useState(props.jobDetails);
  const router = useRouter();
  useAsync(async () => {
    if (!jobDetails) {
      const { data } = await fetchData(axios, router.query.id as string);
      setJobDetails(data);
    }
  }, [jobDetails]);

  return (
    <DefaultLayout>
      <Head>
        <title>
          Job Detail{' '}
          {jobDetails && `- ${jobDetails.company} - ${jobDetails.title}`}
        </title>
      </Head>

      {jobDetails && (
        <Container className="my-4">
          <Row>
            <Col md={{ span: 5, offset: 1 }} className="">
              <h1 className="text-center">{jobDetails.title}</h1>
              <Image
                src={jobDetails.picture.path}
                className="d-block w-75 mx-auto"
                rounded
              />
            </Col>
            <Col md={6} className="mx-auto mt-5">
              <h4>Location:</h4>
              <p>
                <address>{jobDetails.address}</address>
              </p>

              <h4>Wage:</h4>
              <p>
                {jobDetails.lowerBoundSalary} - {jobDetails.upperBoundSalary}{' '}
                Baht/month
              </p>

              <h4>Description:</h4>
              <p>{jobDetails.description}</p>

              <h4>Amount Require:</h4>
              <p>{jobDetails.amountRequired}</p>
            </Col>
          </Row>
          <Row className="">
            <Col
              md={{ span: 5, offset: 1 }}
              className="d-flex justify-content-center">
              <Link href={`/apply/${jobDetails.id}`}>
                <button type="button" className="my-2 btn btn-primary">
                  Apply
                </button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  );
};

async function fetchData(axios: AxiosInstance, id: string) {
  return axios.get(`/job/index/${id}`);
}

export async function getServerSideProps(context) {
  const { data } = isServerReq(context.req)
    ? await fetchData(makeServerAxios(context), context.params.id)
    : { data: null };
  return {
    props: {
      jobDetails: data,
    },
  };
}

export default JobDetails;
