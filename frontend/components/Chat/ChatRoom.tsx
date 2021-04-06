import React, { useState } from 'react';
import {
  Col,
  FormControl,
  Row,
  InputGroup,
  Button,
  NavItem,
  Container,
} from 'react-bootstrap';
import ChatLog from './ChatLog';
import styles from './ChatRoom.module.scss';

export const ChatRoom: React.FC<any> = ({ message, chat, sendMessage, handleChange, keyPress, value }) => {
  const text = message.map((item) => 
    <ChatLog key={item.id} {...item}></ChatLog>
  );
  return (
    <Col className="border" md={9}>
      <Row className={styles['chatlog-header']}>
        <p className="font-weight-bold w-100 pb-0 mb-0 text-center">
          {chat.user.id === chat.recruiter.id
            ? chat.applicant.username
            : chat.recruiter.username}
        </p>
      </Row>
      <Row className={styles['chatlog']}>{text}</Row>
      <Row noGutters className={`fixed-button ${styles['sendbox']}`}>
        <Col>
          <InputGroup className="mb-3 align-buttom">
            <FormControl
              placeholder="Text Message"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              onKeyPress={keyPress}
              value={value || ""}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={sendMessage}>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Col>
  );
};

export default ChatRoom;
