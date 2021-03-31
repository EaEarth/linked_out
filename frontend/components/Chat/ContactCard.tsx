import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';

export const ContactCard: React.FC<any> = (props) => {
  return (
    <button className="list-group-item">
      <Row>
        <Col md={3} className="px-1 py-1">
          <Image
            src="http://localhost:8000/api/files/default_profile_3.jpg"
            width={300}
            height={300}
            layout="responsive"
            className=""
          />
        </Col>

        <Col md={9}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{mockData[0].name}</h5>
            <small>{mockData[0].lastDate}</small>
          </div>
          <div className="d-flex w-100 justify-content-between">
            <small className="">{mockData[0].lastMessage}</small>
          </div>
        </Col>
      </Row>
    </button>
  );
};

export default ContactCard;
