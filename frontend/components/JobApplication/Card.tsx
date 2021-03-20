import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import ApplicationForm from '../../models/ApplicationForm/ApplicationForm';
import style from './jobApplication.module.scss';
import dayjs from 'dayjs';

export type ApplicationFormCardProps = Partial<ApplicationForm>;

export const JobApplicationCard: React.FC<ApplicationFormCardProps> = (
  props
) => {
  const router = useRouter();
  const statusHandler = (status) => {
    if (status == 1) return style['card-normal'];
    else if (status == 2) return style['card-green'];
    else return style['card-red'];
  }
  return (
    <a
      href={props.id ? `/jobs/list/detail/${props.id}` : undefined}
      className={style['custom-a']}
      onClick={(e) => e.preventDefault()}>
      <Card
        className={`mb-3 ${style['card']} ${statusHandler(props.status)}`}
        onClick={() => {
          if (props.id) router.push(`/jobs/list/detail/${props.id}`);
        }}>
        <Row noGutters className="align-items-center">
          {/* Image */}
          <Col xs={3} md={5}>
            <Image
              src={props.applicant.avatarFile?.path || '/images/user/User.svg'}
              width="400"
              height="400"
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
                    {props.applicant.firstname} {props.applicant.lastname}
                  </Col>
                  <Col xs={4} className={`${style['wrap-text']}`}>
                    <small className="text-muted d-md-none float-right">
                      {dayjs(props.createdAt).fromNow()}
                    </small>
                  </Col>
                </Row>
              </h6>
              <p className="card-text m-0">Age: {dayjs().diff(dayjs(props.applicant.birthDate), 'year')}</p>
              <p className="card-text m-0">{props.applicant.address}</p>

              <p className="card-text m-0 d-none d-md-block mt-md-4">
                <small className="text-muted">
                  {dayjs(props.createdAt).fromNow()}
                </small>
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </a>
  );
};

export default JobApplicationCard;
