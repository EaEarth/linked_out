import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ApplicationForm from '../../models/ApplicationForm/ApplicationForm';
import JobApplyCard from './Card';

export type ApplicationFormGridProps = {
  applications: Partial<ApplicationForm>[];
};

export const JobApplyGrid: React.FC<ApplicationFormGridProps> = ({
  applications,
}) => {
  const rows = [];
  for (let i = 0; i < applications.length; i += 2) {
    rows.push(
      <Row key={i}>
        {i < applications.length && (
          <Col md={6}>
            <JobApplyCard key={i} {...applications[i]} />
          </Col>
        )}
        {i + 1 < applications.length && (
          <Col md={6}>
            <JobApplyCard key={i + 1} {...applications[i + 1]} />
          </Col>
        )}
      </Row>
    );
  }
  return <>{rows}</>;
};

export default JobApplyGrid;
