import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';

export const ChatRoom: React.FC<any> = (props) => {
  return (
    <Col className="pt-2 border" md={9}>
      <Row className="chatlog-header" id="chat-header">
        <p
          className="font-weight-bold w-100 pb-0 mb-0 text-center chatlog-header"
          id="chat-header">
          Dee
        </p>
      </Row>
      <Row className="border">
        <Col md={1}></Col>
        <Col md={11}>
          <p>HELLO</p>
        </Col>
      </Row>
      <Row className="border">
        <p>HI</p>
      </Row>
    </Col>
  );
};

export default ChatRoom;
