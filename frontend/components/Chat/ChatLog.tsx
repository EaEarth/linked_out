import React from 'react';
import { Card, CardColumns, Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';
import Image from 'next/image';

export const ChatLog: React.FC<any> = (props) => {
  return (
    <Card >
      <Row noGutters>
        <Col className="p-2 border" md={1}>
          <Image
            src={props.picture?.path || '/images/company/default.png'}
            width="50"
            height="50"
            layout="intrinsic"
          />
        </Col>
        {/* Content */}
        <Col xs={9} md={11}>
          <Card.Body>
            <h6 className="card-title mb-0">
              <Row>
                <Col xs={8} md={12}>
                  {props.title}
                </Col>
              </Row>
            </h6>
            <p className="card-text m-0">{props.text}</p>
          </Card.Body>
        </Col>
      </Row>
    </Card>



  );
};

export default ChatLog;
