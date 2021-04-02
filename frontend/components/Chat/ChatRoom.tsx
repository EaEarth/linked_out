import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';

export const ChatRoom: React.FC<any> = (props) => {
  return (
    <Col className="pt-2 border" md={9}>
      <Row className="chatlog-header">
        <p className="font-weight-bold w-100 pb-0 mb-0 text-center">Dee</p>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <p className="border">HELLO</p>
        </Col>
      </Row>
      <Row>
        <p className="border">HI</p>
      </Row>
    </Col>
  );
};

export default ChatRoom;
