import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Badge, Card, Col, Container, Row, Pagination } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import style from './index.module.scss';

const mockJobs = [
  {
    role: 'Programmer',
    createdAt: '1 day ago',
    location: 'Bangkok, Thailand',
    companyName: 'Wongnai',
    image: '/images/company/wongnai.jpg',
  },
  {
    role: 'Full-stack Developer',
    createdAt: '4 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Wongnai',
    image: '/images/company/wongnai.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '3 weeks ago',
    location: 'Bangkok, Thailand',
    companyName: 'Thinknet',
    image: '/images/company/thinknet.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '5 days ago',
    location: 'Bangkok, Thailand',
    companyName: 'Bluebik',
    image: '/images/company/bluebik.jpg',
  },
  {
    role: 'Software Engineer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Bitkub',
    image: '/images/company/bitkub.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'SCG',
    image: '/images/company/scg.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'KBTG',
    image: '/images/company/kbtg.png',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Central',
    image: '/images/company/central.png',
  },
  {
    role: 'Web Developer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Skooldio',
    image: '/images/company/skooldio.png',
  },
];

const mockTags = [
  { name: 'โปรแกรมเมอร์' },
  { name: 'แพทย์' },
  { name: 'การตลาด' },
  { name: 'บัญชี' },
];

type JobAnnouncementCardProps = {
  role: string;
  companyName: string;
  location: string;
  createdAt: string;
  image?: string;
};

const JobAnnouncementCard = (props: JobAnnouncementCardProps) => {
  const router = useRouter();
  return (
    <a
      href="/test"
      className={style['custom-a']}
      onClick={(e) => e.preventDefault()}>
      <Card
        className={`mb-3 ${style['card']}`}
        onClick={() => router.push(`/test`)}>
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
          </Col>
        </Row>
      </Card>
    </a>
  );
};

type JobAnnouncement = JobAnnouncementCardProps;

type JobAnnouncementGridProps = {
  jobs: JobAnnouncement[];
};

const JobAnnouncementGrid = ({ jobs }: JobAnnouncementGridProps) => {
  const rows = [];
  for (let i = 0; i < jobs.length; i += 2) {
    rows.push(
      <Row key={i}>
        {i < jobs.length && (
          <Col md={6}>
            <JobAnnouncementCard key={i} {...jobs[i]} />
          </Col>
        )}
        {i + 1 < jobs.length && (
          <Col md={6}>
            <JobAnnouncementCard key={i + 1} {...jobs[i + 1]} />
          </Col>
        )}
      </Row>
    );
  }
  return <>{rows}</>;
};

type Tag = {
  name: string;
};

type TagListProps = {
  tags: Tag[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <Row>
      <Col>
        <ul className="list-inline">
          {tags.map((tag, i) => (
            <li key={i} className="list-inline-item">
              <Badge className={`border border-dark ${style['custom-badge']}`}>
                {tag.name}
              </Badge>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export const Jobs = (props) => {
  const [tags, setTags] = useState(mockTags);
  const [jobs, setJobs] = useState(mockJobs);
  return (
    <DefaultLayout>
      <Head>
        <title>Job Announcements - LinkedOut</title>
      </Head>
      <Container className="mt-4">
        <TagList tags={tags} />
        <JobAnnouncementGrid jobs={jobs} />
        <Row>
          <Col>
            <Pagination className="justify-content-center">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Jobs;
