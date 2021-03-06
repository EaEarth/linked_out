import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import styles from './ChatList.module.scss';

export const ContactCard: React.FC<any> = (props) => {
  return (
    <button
      className="list-group-item w-100"
      style={{
        backgroundColor:
          !props.currentRoom || props.currentRoom.id !== props.id
            ? 'white'
            : 'Azure',
      }}
      onClick={props.setNewRoom({
        recruiter: props.recruiter,
        jobAnnouncement: props.jobAnnouncement,
        applicant: props.applicant,
        user: props.user,
        id: props.id,
      })}>
      <Row>
        <Col md={3} className="px-1 py-1">
          <Image
            src={
              props.user.id === props.recruiter.id
                ? props.applicant.avatarFile?.path || '/images/user/user.svg'
                : props.recruiter.avatarFile?.path || '/images/user/user.svg'
            }
            width={300}
            height={300}
            layout="responsive"
            className=""
          />
        </Col>

        <Col md={9}>
          <div className="d-flex w-100">
            <h5 className={`mb-1  ${styles['chatName']}`}>
              {props.user.id === props.recruiter.id
                ? props.applicant.firstname
                : props.recruiter.firstname}
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
