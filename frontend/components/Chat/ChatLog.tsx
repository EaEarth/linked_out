import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';
import Image from 'next/image';

export const ChatLog: React.FC<any> = (props) => {
  return (
    <Card >
      <Row noGutters>
        <Col className="p-2 border" md={2}>
          <Image
            src={props.picture?.path || '/images/company/default.png'}
            width="50"
            height="50"
            layout="intrinsic"
          />
        </Col>
        <Col className="pt-2 border">
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Col>
      </Row>
    </Card>
    
  );
};

export default ChatLog;
