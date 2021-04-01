import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import DefaultLayout from '../../layouts/Default';
export const chatRoom = (props) => {
  const mockData = [
    {
      name: 'Dee',
      lastMessage: 'HELLO MAN',
      lastDate: '3 days ago',
    },
  ];

  return (
    <DefaultLayout>
      <Head>
        <title>Chatroom</title>
      </Head>

      <Container className="my-3">
        <Row>
          <Col md={3}>
            <div className="list-group w-100">
              <button className="list-group-item">
                <Row>
                  <Col md={3} className="px-1 py-1">
                    <Image
                      src="http://localhost:8000/api/files/default_profile_3.jpg"
                      width={300}
                      height={300}
                      layout="responsive"
                      className=""
                    />
                  </Col>

                  <Col md={9}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{mockData[0].name}</h5>
                      <small>{mockData[0].lastDate}</small>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <small className="">{mockData[0].lastMessage}</small>
                    </div>
                  </Col>
                </Row>
              </button>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </div>
          </Col>
          <Col md={9}></Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default chatRoom;
