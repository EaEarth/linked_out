import Head from 'next/head';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import DefaultLayout from '../../layouts/Default';
import styles from '../../components/Chat/ChatList.module.scss';
import ContactCard from '../../components/Chat/ContactCard';
import ChatList from '../../components/Chat/ChatList';

export const chatRoom = (props) => {
  const mockData = [
    {
      name: 'Dee',
      job: 'Back-end Dev',
      lastDate: '3 days ago',
    },
    {
      name: 'Dee',
      job: 'Back-end Dev',
      lastDate: '3 days ago',
    },
    {
      name: 'Dee',
      job: 'Back-end Dev',
      lastDate: '3 days ago',
    },
    {
      name: 'Dee',
      job: 'Back-end Dev',
      lastDate: '3 days ago',
    },
    {
      name: 'Dee',
      job: 'Back-end Dev',
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
            <div className={`list-group ${styles.chatlist}`}>
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
              <ContactCard {...mockData[0]}></ContactCard>
              <ContactCard {...mockData[0]}></ContactCard>
              <ContactCard {...mockData[0]}></ContactCard>
              <ContactCard {...mockData[0]}></ContactCard>
            </div>
          </Col>
          <Col md={3}>
            <ChatList {...mockData}></ChatList>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default chatRoom;
