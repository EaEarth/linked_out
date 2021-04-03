import React from 'react';
import { Col, FormControl, Row, InputGroup, Button } from 'react-bootstrap';
import ChatLog from './ChatLog';
import styles from './ChatRoom.module.scss';

export const ChatRoom: React.FC<any> = (props) => {
  return (
    <Col className="pt-2 border" md={9}>
      <Row className={styles['chatlog-header']}>
        <p className="font-weight-bold w-100 pb-0 ปmb-0 text-center">Dee</p>
      </Row>
      <ChatLog {...{ title: 'DEE', text: 'Hello how are you  kuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuaykuay' }}></ChatLog>
      <ChatLog {...{ title: 'xcsfdg', text: 'Hello how are you  ' }}></ChatLog>
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
