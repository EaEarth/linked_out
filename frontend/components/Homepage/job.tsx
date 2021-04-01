import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import style from './homepage.module.scss';
import dayjs from 'dayjs';

export type JobAnnouncementCardProps = Partial<JobAnnouncement>;

export const JobAnnouncementCard: React.FC<JobAnnouncementCardProps> = (
    props
) => {
    const router = useRouter();
    return (
        <a
            href={props.id ? `/jobs/${props.id}` : undefined}
            className={style['custom-a']}
            onClick={(e) => e.preventDefault()}>
            <Container className={style['grid']}>
                <Row>
                    <Col>
                        <Image
                            src={props.picture?.path || '/images/company/default.png'}
                            width="500"
                            height="500"
                            layout="responsive"
                            className={`${style['image']}`}
                        />
                    </Col>
                    <Col>
                        {props.title}
                    </Col>
                    <Col>
                        {props.company}
                    </Col>
                    <Col>
                        {props.lowerBoundSalary} to {props.upperBoundSalary} Baht/month
                    </Col>
                    <Col>
                        {props.province}
                    </Col>
                </Row>
            </Container>
        </a>
    );
};

export default JobAnnouncementCard;
