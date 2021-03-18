import Head from 'next/head';
import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../layouts/Default';

export const Home = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>LinkedOut</title>
      </Head>
      <Jumbotron>
        <Container>
          <h1 className="display-3">Welcome to Linked Out</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more »
            </a>
          </p>
        </Container>
      </Jumbotron>
    </DefaultLayout>
  );
};

export default Home;
