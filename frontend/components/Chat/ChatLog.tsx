import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';
import Image from 'next/image';

export const ChatLog: React.FC<any> = (props) => {
  return (
    <Card>
      <Col className="pt-2 border" md={3}>
        <Image
          src={props.picture?.path || '/images/company/default.png'}
          width="75"
          height="75"
          layout="intrinsic"
        />
      </Col>
      <Col className="pt-2 border" md={9}>
        <Row>{props.title}</Row>
        <Row>{props.text}</Row>
      </Col>
    </Card>
  );
};

export default ChatLog;
