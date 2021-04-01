import React from 'react';
import { Col, Row } from 'react-bootstrap';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import JobAnnouncementCard from './job';
import style from './homepage.module.scss';

export type JobAnnouncementGridProps = {
    jobs: Partial<JobAnnouncement>[];
};

export const JobAnnouncementGrid: React.FC<JobAnnouncementGridProps> = ({
    jobs,
}) => {
    const rows = [];
    rows.push(
        <Row key={'title'} >
            <Col>
                <Row noGutters className={`${style['title']} align-items-center rounded`}>
                    <Col className="pl-3 pr-0" md={4}>
                        Position
                    </Col>
                    <Col className="px-0 d-none d-md-block">
                        Company
                    </Col>
                    <Col className="px-0 d-none d-md-block">
                        Salary
                    </Col>
                    <Col className="pl-0 d-none d-md-block" md={2}>
                        Province
                    </Col>
                </Row>
            </Col>

        </Row>
    );
    for (let i = 0; i < jobs.length; i++) {
        rows.push(
            <Row key={i}>
                {i < jobs.length && (
                    <Col>
                        <JobAnnouncementCard key={i} {...jobs[i]} />
                    </Col>
                )}
            </Row >
        );
    }
    return <>{rows}</>;
};

export default JobAnnouncementGrid;
