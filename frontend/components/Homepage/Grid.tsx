import React from 'react';
import { Col, Row } from 'react-bootstrap';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import JobAnnouncementCard from './job';

export type JobAnnouncementGridProps = {
    jobs: Partial<JobAnnouncement>[];
};

export const JobAnnouncementGrid: React.FC<JobAnnouncementGridProps> = ({
    jobs,
}) => {
    const rows = [];
    rows.push(
        <Row key={'title'}>
            <col>
            </col>
            <Col>
                Position
        </Col>
            <Col>
                Company
        </Col>
            <Col>
                Salary
        </Col>
            <Col>
                Province
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
