import React from 'react';
import { Col, Row } from 'react-bootstrap';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import JobAnnouncementCard from './Card';

export type JobAnnouncementGridProps = {
  jobs: Partial<JobAnnouncement>[];
};

export const JobAnnouncementGrid: React.FC<JobAnnouncementGridProps> = ({
  jobs,
}) => {
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

export default JobAnnouncementGrid;
