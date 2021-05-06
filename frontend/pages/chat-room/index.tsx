import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import DefaultLayout from '../../layouts/Default';
import ChatList from '../../components/Chat/ChatList';
import ChatRoom from '../../components/Chat/ChatRoom';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRootStore } from '../../stores/stores';
import { useLifecycles } from 'react-use';

export const chatRoom = (props) => {
  const [chatrooms] = useState(props.chatrooms || []);
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState();
  const [currentRoom, setCurrentRoom] = useState<any>();

  const { webSocketStore } = useRootStore();
  useLifecycles(
    () => {
      webSocketStore.init();
      webSocketStore.connect();
      // registers
    },
    () => {
      // unregister
      webSocketStore.socket.off('recieve_message');
      // shutdown
      webSocketStore.close();
    }
  );

  useEffect(() => {
    webSocketStore.socket.on('recieve_message', (payload) => {
      appendMessage(payload);
    });
    return () => {
      webSocketStore.socket.off('recieve_message');
    };
  }, [messages]);

  const appendMessage = (message) => {
    if (currentRoom && message.chatroomId === currentRoom.id) {
      setMessages((prevState) => {
        const nextState = prevState.slice();
        if (
          nextState.length === 0 ||
          message.id !== nextState[nextState.length - 1].id
        )
          nextState.push(message);
        return nextState;
      });
    }
  };

  const setNewRoom = (chatRoom) => async (e) => {
    setCurrentRoom(chatRoom);
    setNewMessage(chatRoom.id);
  };

  const setNewMessage = async (chatRoomId) => {
    const { data } = await axios.get(
      `/chat/index/message/chat-room/${chatRoomId}`
    );
    setMessages(data);
  };

  const sendMessage = () => {
    if (messageBox && messageBox !== '') {
      webSocketStore.socket.emit('send_message', {
        chatRoomId: currentRoom.id,
        message: messageBox,
        cookie: webSocketStore.cookie,
      });
      setMessageBox(() => null);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessageBox(() => value);
  };

  const keyPress = (event) => {
    if (event.code === 'Enter') {
      sendMessage();
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Chatroom</title>
      </Head>

      <Container className="my-3">
        <Row>
          <Col md={3}>
            <ChatList
              chat={chatrooms}
              setNewRoom={setNewRoom}
              currentRoom={currentRoom}></ChatList>
          </Col>
          {currentRoom && (
            <ChatRoom
              message={messages}
              chat={currentRoom}
              sendMessage={sendMessage}
              handleChange={handleChange}
              keyPress={keyPress}
              value={messageBox}></ChatRoom>
          )}
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const cookie = context.req.cookies;
  const { data } = await axios.get('/chat/index/member/chat-room', {
    headers: {
      Cookie: `jwt=${cookie['jwt']}`,
    },
  });
  return {
    props: {
      chatrooms: data,
      cookie: cookie,
    },
  };
}

export default chatRoom;
