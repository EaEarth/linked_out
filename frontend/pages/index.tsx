import Head from 'next/head';
import React from 'react';
import { Col, Container, Jumbotron, Row, } from 'react-bootstrap';
import DefaultLayout from '../layouts/Default';
import styles from '../components/Homepage/homepage.module.scss';

export const Home = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>LinkedOut</title>
      </Head>
      <Jumbotron>
        <Container className={`${styles['container']}`}>
          <h1 className="display-3 text-center">Welcome to Linked Out</h1>
          <h2 className="text-center">Find your dream job</h2>
        </Container>
      </Jumbotron>
    </DefaultLayout>
  );
};

export default Home;
