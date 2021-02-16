import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Badge, Card, Col, Container, Row, Pagination } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
<<<<<<< HEAD
import Link from 'next/link';
=======
import style from './index.module.scss';
>>>>>>> 6034efdcbab43cef9904a9409c493ff1c1cd73df

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
<<<<<<< HEAD
          <Link href="/test">Click me!</Link>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              elementum, sem malesuada venenatis feugiat, nunc orci efficitur
            odio. Cras volutpat tellus sed
              ligula suscipit rhoncus. Ut tempor erat vel leo commodo bibendum.
              Nam lacus lacus, eleifend quis magna et, bibendum finibus justo.
              Sed blandit laoreet dapibus. Vestibulum rhoncus ligula at
              dignissim pharetra. Ut suscipit dui a ante rutrum, ac dictum
              mauris ultrices. Fusce elementum libero ac tellus pharetra, et
              ullamcorper justo eleifend. Duis felis orci, tempus a tincidunt
              et, tincidunt a urna. Proin dictum dignissim tortor sed imperdiet.
              Vivamus a neque in libero tempor molestie et at lorem.
            </p>
            <p>
              Sed ac porta mauris. Maecenas interdum semper lacus, at molestie
              nulla porttitor mattis. Duis ultrices ac dolor convallis molestie.
              Vivamus vitae rutrum odio. Suspendisse sit amet orci dolor.
              Integer eros massa, condimentum ut leo quis, auctor consequat
              felis. Phasellus commodo diam mauris, sed varius leo mattis nec.
              Proin ac ex vitae lacus blandit pretium. Nam nec vehicula elit.
              Curabitur rutrum felis quis eros elementum, quis semper arcu
              maximus. Nam pharetra magna sit amet vehicula bibendum. Etiam elit
              massa, facilisis ut ornare sed, pellentesque id lacus.
            </p>
            <p>
              Praesent viverra leo sem, pharetra dictum quam aliquet et. Ut
              vitae accumsan dolor. Integer eu tortor ipsum. Cras vel justo
              tortor. Ut scelerisque, tellus quis luctus venenatis, enim nisi
              gravida purus, et rutrum arcu odio at justo. Vestibulum
              pellentesque porttitor enim. Ut vel condimentum est, sit amet
              placerat mauris. Nulla a placerat nulla. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              In blandit justo ligula, id feugiat eros elementum eu. Etiam sem
              elit, fringilla non justo ut, pulvinar vulputate risus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Ut vitae condimentum enim. Mauris efficitur
              tellus quis ex eleifend lacinia.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Sed rutrum massa vitae libero
              ornare tristique. Donec fringilla nisl sapien. Pellentesque ut
              lorem lobortis, tincidunt ipsum in, varius neque. Aliquam erat
              volutpat. Ut gravida purus vel eros mollis posuere. Fusce varius
              libero a odio sollicitudin, ac sagittis tellus scelerisque.
              Vestibulum porttitor diam vitae nunc gravida consectetur. Duis
              consectetur a libero rhoncus venenatis.
            </p>
            <p>
              Donec ornare nulla ut vulputate semper. Fusce non magna sagittis,
              consectetur velit quis, lacinia tellus. Phasellus quis mauris
              tempus, sagittis risus quis, euismod elit. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Cras risus dui, fringilla sit amet diam id, molestie interdum
              nulla. Vestibulum vitae dignissim tortor. Cras fermentum nunc eu
              urna congue, eget hendrerit magna elementum. Duis vel sollicitudin
              mauris, nec condimentum purus. Integer a mattis est. Aliquam
              lobortis pulvinar velit, ac dapibus risus auctor eu. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Donec vestibulum lorem in quam interdum, sit amet
              gravida augue euismod. Sed quis dui et ex varius vulputate ut eu
              neque. In eget consequat ipsum. Fusce molestie faucibus tellus, eu
              efficitur metus consectetur sit amet. Nam tellus dolor,
              sollicitudin et leo ut, tempus volutpat eros.
            </p>{' '}
=======
            <Pagination className="justify-content-center">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
>>>>>>> 6034efdcbab43cef9904a9409c493ff1c1cd73df
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Jobs;
