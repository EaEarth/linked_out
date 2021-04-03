import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import DefaultLayout from '../../layouts/Default';
import styles from '../../components/Chat/ChatList.module.scss';
import ContactCard from '../../components/Chat/ContactCard';
import ChatList from '../../components/Chat/ChatList';
import ChatRoom from '../../components/Chat/ChatRoom';
import { GetServerSidePropsContext } from 'next';
import Test from '../test';
import ChatLog from '../../components/Chat/ChatLog';

export const chatRoom = (props) => {
  const [chatrooms, setChatRooms] = useState(props.chatrooms || []);
  const [messages, setMessages] = useState([])
  const [currentRoom, setCurrentRoom] = useState()

  const chatLog = messages.map(log=>{
    <ChatLog {...{log}}></ChatLog>
  })

  const setNewRoom = chatRoom => async e => {
    setCurrentRoom(chatRoom)
    setNewMessage(chatRoom.id)
  }

  const setNewMessage = async chatRoomId => {
    const cookie = props.cookie
    const { data } = await axios.get(
      `http://localhost:8000/api/chat/index/message/chat-room/${chatRoomId}`,
      {
        headers: {
          Cookie: `jwt=${cookie['jwt']}`,
        },
      }
    );
    setMessages(data);
  }


  return (
    <DefaultLayout>
      <Head>
        <title>Chatroom</title>
      </Head>

      <Container className="my-3">
        <Row>
          <Col md={3}>
            <ChatList chat={chatrooms} setNewRoom={setNewRoom}></ChatList>
          </Col>
          {currentRoom && (
            <ChatRoom message={messages} chat={currentRoom}></ChatRoom>
          )}
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
      cookie: cookie
    },
  };
}

export default chatRoom;
