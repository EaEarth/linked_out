import Head from 'next/head';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import DefaultLayout from '../../layouts/Default';
import ChatList from '../../components/Chat/ChatList';
import ChatRoom from '../../components/Chat/ChatRoom';
import { GetServerSidePropsContext } from 'next';
import { useRootStore } from '../../stores/stores';
import { useLifecycles } from 'react-use';

export const chatRoom = (props) => {
  const [chatrooms, setChatRooms] = useState(props.chatrooms || []);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState<any>();
  const [messageBox, setMessageBox] = useState();

  const webSocketStore = useRootStore().webSocketStore;
  webSocketStore.init()
  webSocketStore.setCookie(props.cookie)
  useLifecycles(
    () => {
      webSocketStore.connect();
    },

    () => {
      webSocketStore.close();
    }
  );
  webSocketStore.socket.on('recieve_message', (payload) => {
    appendMessage(payload);
  });

  const appendMessage = (message) => {
    setMessages((prevState)=> { 
      const newList = prevState
      if(newList.length === 0 || message.id !== newList[newList.length-1].id) newList.push(message)
      return newList
    })
  }

  const setNewRoom = (chatRoom) => async (e) => {
    setCurrentRoom(chatRoom);
    setNewMessage(chatRoom.id);
  };

  const setNewMessage = async (chatRoomId) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/chat/index/message/chat-room/${chatRoomId}`
    );
    setMessages(data);
  };
  
  const sendMessage = () => {
    if(messageBox && messageBox !== ""){
      webSocketStore.socket.emit('send_message', {
        chatRoomId: currentRoom.id,
        message: messageBox,
        cookie: props.cookie
      });
      setMessageBox(()=>(null))
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setMessageBox(() => (value));
  };

  const keyPress = (event) => {
    if(event.code === "Enter"){
      sendMessage();
    }
  }

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
