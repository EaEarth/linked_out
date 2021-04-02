import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import DefaultLayout from '../../layouts/Default';
import styles from '../../components/Chat/ChatList.module.scss';
import ContactCard from '../../components/Chat/ContactCard';
import ChatList from '../../components/Chat/ChatList';
import { GetServerSidePropsContext } from 'next';
import ChatRoom from '../../models/Chat/Chatroom';

export const chatRoom = (props) => {
  const [chatrooms, setChatRooms] = useState(props.chatrooms || []);
  const mockData: any[] = [
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
            <ChatList {...props.chatrooms}></ChatList>
          </Col>
          <Col className="pt-2 border" md={9}>
            <div>
              <p className="font-weight-bold pb-0 mb-0 text-center">Dee</p>
            </div>
            <div>
              <p className="border">HELLO</p>
            </div>
            <div>
              <p className="border text-right">HI</p>
            </div>
            {/* <ul className="list-group">
              <li className="list-group-item active text-center h3">Dee</li>
              <div className="container">
                <img
                  src="http://localhost:8000/api/files/default_profile_1.jpg"
                  alt="Avatar"></img>
                <p>Hello. How are you today?</p>
                <span className="time-right">11:00</span>
              </div>
              <li className="list-group-item ">
                <p className="font-weight-bold pb-0 mb-0">Dee</p>
                <p>HELLO</p>
              </li>
              <li className="list-group-item">
                <p className="font-weight-bold pb-0 mb-0">Earth</p>
                <p>HI</p>
              </li>
            </ul> */}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = context.req.cookies;
  const { data } = await axios.get(
    'http://localhost:8000/api/chat/index/member/chat-room',
    {
      headers: {
        Cookie: `jwt=${cookie['jwt']}`,
      },
    }
  );
  return {
    props: {
      chatrooms: data,
    },
  };
}

export default chatRoom;
