import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ApplicationForm from '../../models/ApplicationForm/ApplicationForm';
import JobApplicationCard from './Card';

export type ApplicationFormGridProps = {
  applications: Partial<ApplicationForm>[];
};

export const JobApplicationGrid: React.FC<ApplicationFormGridProps> = ({
  applications,
}) => {
  const rows = [];
  for (let i = 0; i < applications.length; i += 2) {
    rows.push(
      <Row key={i}>
        {i < applications.length && (
          <Col md={6}>
            <JobApplicationCard key={i} {...applications[i]} />
          </Col>
        )}
        {i + 1 < applications.length && (
          <Col md={6}>
            <JobApplicationCard key={i + 1} {...applications[i + 1]} />
          </Col>
        )}
      </Row>
    );
  }
  return <>{rows}</>;
};

export default JobApplicationGrid;
