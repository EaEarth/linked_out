import React, { useState } from 'react';
import { Col, FormControl, Row, InputGroup, Button, NavItem } from 'react-bootstrap';
import ChatLog from './ChatLog';
import styles from './ChatRoom.module.scss';

export const ChatRoom: React.FC<any> = ({message, chat}) => {
  const text = message.map((item) => (
    <ChatLog key={item.id} {...item}></ChatLog>
  ))
  return (
    <Col className="pt-2 border" md={9}>
      <Row className={styles['chatlog-header']}>
        <p className="font-weight-bold w-100 pb-0 mb-0 text-center">
          {chat.user.id === chat.recruiter.id
                ? chat.applicant.username
                : chat.recruiter.username}
        </p>
      </Row>
        {text}
      <Row noGutters className={`${styles['sendbox']}`}>
        <InputGroup className="mb-3 align-buttom">
          <FormControl
            placeholder="Text Message"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Col>
  );
};

export default ChatRoom;
