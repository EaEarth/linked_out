import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import style from './index.module.scss';
import Jobs from '../../pages/jobs';

export type JobAnnouncementCardProps = {
  id?: number;
  role: string;
  companyName: string;
  location: string;
  createdAt: string;
  image?: string;
};


export const JobAnnouncementCard: React.FC<JobAnnouncementCardProps> = (
  props
) => {
  const DEFAULT_NAVBAR_TITLE = 'LinkedOut';
  const router = useRouter();
  const navBarTitleMapping: Record<string, string> = {
    '/test': 'Test',
    '/': 'Home',
    '/jobs': 'Job Announcements',
    '/auth/login': 'Login',
    '/auth/register': 'Register',
  };
  const divider = {
    width: "5px"
  }
  function handleEdit(e) {

    props
  }

  return (
    <a
      href={props.id ? `/jobs/${props.id}` : undefined}
      className={style['custom-a']}
      onClick={(e) => e.preventDefault()}>
      <Card
        className={`mb-3 ${style['card']}`}
        onClick={() => {
          if (props.id) router.push(`/jobs/${props.id}`);
        }}>
        <Row noGutters className="align-items-center">
          {/* Image */}
          <Col xs={3} md={5}>
            <Image
              src={props.image || '/images/company/default.png'}
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
                    {props.role}
                  </Col>
                  <Col xs={4} className={`${style['wrap-text']}`}>
                    <small className="text-muted d-md-none float-right">
                      {props.createdAt}
                    </small>
                  </Col>
                </Row>
              </h6>
              <p className="card-text m-0 text-primary">{props.companyName}</p>
              <p className="card-text m-0">{props.location}</p>
              <p className="card-text m-0 d-none d-md-block mt-md-4">
                <small className="text-muted">{props.createdAt}</small>
              </p>
            </Card.Body>

            <Col >
              <button type="button" className="my-2 btn btn-primary" onClick={() => { router.push('/jobs/editJobDetail/' + props.id.toString()) }}>Edit</button>
              <button type="button" className="my-2 btn btn-primary">Delete</button>

            </Col>




          </Col>

        </Row>
      </Card>
    </a>
  );
};

export default JobAnnouncementCard;
