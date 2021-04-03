import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';

export const ContactCard: React.FC<any> = (props) => {
  return (
    <button className="list-group-item w-100" onClick={props.setNewRoom(props)} >
      <Row>
        <Col md={3} className="px-1 py-1">
          <Image
            src={
              props.user.id === props.recruiter.id
                ? props.applicant.avatarFile.path
                : props.recruiter.avatarFile.path
            }
            width={300}
            height={300}
            layout="responsive"
            className=""
          />
        </Col>

        <Col md={9}>
          <div className="d-flex w-100">
            <h5 className="mb-1">
              {props.user.id === props.recruiter.id
                ? props.applicant.username
                : props.recruiter.username}
            </h5>
          </div>
          <div className="d-flex w-100">
            <small className="text-left">{props.jobAnnouncement.title}</small>
          </div>
        </Col>
      </Row>
    </button>
  );
};

export default ContactCard;
