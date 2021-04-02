import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import DefaultLayout from '../../layouts/Default';
import styles from '../../components/Chat/ChatList.module.scss';
import ContactCard from '../../components/Chat/ContactCard';
import ChatList from '../../components/Chat/ChatList';
import ChatRoomComp from '../../components/Chat/Chatroom';
import { GetServerSidePropsContext } from 'next';
import ChatRoom from '../../models/Chat/Chatroom';

export const chatRoom = (props) => {
  const [chatrooms, setChatRooms] = useState(props.chatrooms || []);

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
          <ChatRoomComp></ChatRoomComp>
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
