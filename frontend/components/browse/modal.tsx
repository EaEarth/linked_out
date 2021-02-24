import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, Modal } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Select from 'react-select';
import Link from 'next/link';
import styles from './modal.module.scss';

export const BrowseModal = (props) => {
  const [position, setPosition] = useState('');
  const [jobTypes, setJobTypes] = useState<Array<String>>([]);
  const [location, setLocation] = useState(null);
  const [wage, setWage] = useState(null);
  const options = [
    { value: 'programer', label: 'Programer' },
    { value: 'police', label: 'Police' },
    { value: 'king', label: 'King' },
    { value: 'queen', label: 'Queen' },
    { value: 'prince', label: 'Prince' },
  ];
  const province = [
    { value: 'bangkok', label: 'Bangkok' },
    { value: 'udonthani', label: 'Udonthani' },
    { value: 'chaingmai', label: 'Chaingmai' },
    { value: 'rayong', label: 'Rayong' },
    { value: 'phuket', label: 'Phuket' },
  ];
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header
        closeButton
        className={`show-grid ${styles['browse-body']}`}>
        <Modal.Title className={`${styles['browse-title']}`}>
          Browse Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`show-grid ${styles['browse-body']}`}>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label className={styles.label}>Position :</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formLocation">
                  <Form.Label className={styles.label}>Location</Form.Label>
                  <Select
                    value={location}
                    options={province}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setLocation(e)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className={styles.label}>Job Type :</Form.Label>
                  <Select
                    isMulti
                    value={jobTypes}
                    name="colors"
                    options={jobTypes.length >= 3 ? jobTypes : options}
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => setJobTypes(e)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className={styles.label}>Wage :</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setWage(e.target.value);
                    }}
                  />
                </Form.Group>

                <Link href="/test">
                  <img
                    role="button"
                    src="images/search.svg"
                    width="64px"
                    height="64px"
                    className="my-2 stretched-link mx-auto d-block"
                  />
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default BrowseModal;
