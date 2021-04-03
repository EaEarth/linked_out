import React from 'react';
import { Card, CardColumns, Col, Row } from 'react-bootstrap';
import styles from './ChatRoom.module.scss';
import Image from 'next/image';

export const ChatLog: React.FC<any> = (props) => {
  return (
    <Card className={styles["chatLogCard"]}>
      <Row noGutters>
        <Col className={`pl-2 pt-3 pr-0`} md={1}>
          <Image
            src={props.picture?.path || '/images/company/central.png'}
            width="50"
            height="50"
            layout="intrinsic"
          />
        </Col>
        {/* Content */}
        <Col className={`p-0 m-0`} xs={9} md={11}>
          <Card.Body>

            <Row>
              <Col className={`p-0 m-0`} xs={8} md={12}>
                <h5 className="card-title">
                  {props.title}
                </h5>
              </Col>
            </Row>

            <Row>
              <Col className={`p-0 m-0`} xs={8} md={12}>
                {props.text}
              </Col>
            </Row>

          </Card.Body>
        </Col>
      </Row>
    </Card >



  );
};

export default ChatLog;
