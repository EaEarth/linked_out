import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Link from 'next/link';
import axios from 'axios';
import styles from './modal.module.scss';

export const BrowseModal = (props) => {
  const [search, setSearch] = useState('');
  const [jobTypes, setJobTypes] = useState([]);
  const [province, setProvince] = useState("");
  const [wage, setWage] = useState('');
  const [tags, setTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/api/job/tag/index')
      .then(function (response) {
        if (response.status === 200) {
          let tags = response.data;
          const tempTags = [];
          for (const tag of tags) {
            tempTags.push({ value: tag.name, label: tag.name });
          }
          setTags(tempTags);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [props.show]);

  const options = [
    { value: 'Bangkok', label: 'Bangkok' },
    { value: 'Chiang Mai', label: 'Chiang Mai' },
    { value: 'Khon Kaen', label: 'Khon Kaen' },
    { value: 'Prachuap Khiri Khan', label: 'Prachuap Khiri Khan' },
    { value: 'Chon Buri', label: 'Chon Buri' },
  ];

  const handleSubmitClick = (e) => {
    e.preventDefault();

    let hasTag = '';
    let tempTag = [];
    if (jobTypes.length > 0) {
      for (const tag of jobTypes) {
        tempTag.push(tag.value);
      }
      hasTag = `&tags=${tempTag}`;
    }

    const hasProvince = province == "" ? '' : `&province=${province}`;
    const hasSearch = search == "" ? '' : `&search=${search}`;
    const hasSalary = (wage == '' || wage == '0') ? '' : `&lowerBoundSalary=${wage}`;
    router.push(`/jobs?browse=true${hasSearch}${hasTag}${hasSalary}${hasProvince}`);
  }

  return (
    <Modal show={props.show} onHide={props.onHide} id="browseModal" aria-labelledby="contained-modal-title-vcenter" centered>
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
                  <Form.Label className={styles.label}>Title & Company :</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formProvince">
                  <Form.Label className={styles.label}>province</Form.Label>
                  <Select
                    value={{ value: province, label: province }}
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProvince(e.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className={styles.label}>Job Type :</Form.Label>
                  <Select
                    isMulti
                    value={jobTypes}
                    options={jobTypes.length >= 3 ? jobTypes : tags}
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
                    src="/images/search.svg"
                    width="64px"
                    height="64px"
                    className="my-2 stretched-link mx-auto d-block"
                    onClick={handleSubmitClick}
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
