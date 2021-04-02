import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const JobDetails = (props) => {
  const jobDetails = props.jobDetails;

  return (
    <DefaultLayout>
      <Head>
        <title>
          Job Detail - {jobDetails.company} - {jobDetails.title}
        </title>
      </Head>

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
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  const details = await axios.get(
    `http://localhost:8000/api/job/index/${context.params.id}`
  );
  return {
    props: {
      jobDetails: details.data,
    },
  };
}

export default JobDetails;
