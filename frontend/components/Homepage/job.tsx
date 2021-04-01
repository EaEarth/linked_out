import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
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
            onClick={(e) => e.preventDefault()}
        >
            <Card className={`${style['grid']} rounded`}
                onClick={() => {
                    if (props.id) router.push(`/jobs/${props.id}`);
                }}>
                <Row noGutters className="align-items-center" >

                    <Col md={4} className="d-flex align-items-center">
                        <Row noGutters>
                            <Col className="mx-2 mb-1 mt-2">
                                <Image
                                    src={props.picture?.path || '/images/company/default.png'}
                                    width="75"
                                    height="75"
                                    layout="intrinsic"
                                    className={`${style['image']}`}
                                />
                            </Col>
                        </Row>
                        {props.title}
                    </Col>
                    <Col>
                        {props.company}
                    </Col>
                    <Col>
                        {props.lowerBoundSalary} to {props.upperBoundSalary} Baht/month
                    </Col>
                    <Col md={2}>
                        {props.province}
                    </Col>
                </Row>
            </Card>
        </a >
    );
};

export default JobAnnouncementCard;
