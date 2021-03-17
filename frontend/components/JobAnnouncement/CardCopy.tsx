import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import style from './index.module.scss';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';


export type JobAnnouncementCardProps = Partial<JobAnnouncement>;

export const JobAnnouncementCard: React.FC<JobAnnouncementCardProps> = (
  props
) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete(`/job/${props.id}`).then((res) => {
      if (res.status == 404) console.log(res.statusText);
    })
      .catch((err) => {
        console.log(err);
      })
    router.reload();
  }

  return (
    <Card className={`mb-3 ${style['card']}`}>
      <Row noGutters className="align-items-center">
        {/* Image */}
        <Col xs={3} md={5}>
          <Image
            src={props.picture?.path || '/images/company/default.png'}
            width="500"
            height="500"
            layout="responsive"
            className={`${style['image']}`}
          />
        </Col>
        {/* Content */}
        <Col xs={9} md={7} className={`${style['card-details-column']}`}>
          <Card.Body>
            <h6 className="card-title mb-0">
              <Row>
                <Col xs={8} md={12}>
                  <Link href={`/jobs/list/applicant/${props.id}`}>
                    <a className='text-dark h5'>{props.title}</a>
                  </Link>
                </Col>
                <Col xs={4} className={`${style['wrap-text']}`}>
                  <small className="text-muted d-md-none float-right">
                    {props.createdAt}
                  </small>
                </Col>
              </Row>
            </h6>
            <p className="card-text m-0 text-primary">{props.company}</p>
            <p className="card-text m-0">{props.province}</p>
            <p className="card-text m-0 d-none d-md-block mt-md-4">
              <small className="text-muted">
                {dayjs(props.createdAt).fromNow()}
              </small>
            </p>
          </Card.Body>
          <Col>
            <button
              type="button"
              className="my-2 mx-2 btn btn-primary"
              onClick={() => {
                router.push('/jobs/editJobDetail/' + props.id.toString());
              }}>
              Edit
            </button>
            <button type="button" className="my-2 btn btn-primary" onClick={handleDelete}>
              Delete
            </button>
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

export default JobAnnouncementCard;
