import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';

export const EditJobDetails = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobTag, setJobTag] = useState(null);
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [publish, setPublish] = useState(null);
    const [wage, setWage] = useState(null);
    const [amount, setAmount] = useState(null);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'cookie', label: 'Cookies' },
        { value: 'trash', label: 'Trash' },
    ];
    const choices = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
    ];

    return (
        <DefaultLayout>
            <Head>
                <title>Edit Job Detail</title>
            </Head>

            <Container className="my-4">
                <Row>
                    <Col md={6}>
                        <Row>
                            <Image
                                src="/images/user/User.svg"
                                className="d-block w-30 mx-auto"
                                rounded
                            />
                        </Row>
                        <Row>
                            <button type="button" className="my-2 btn btn-primary">Add Picture</button>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Form>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Title</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Description</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Job Tag</Form.Label>
                                    <Select
                                        value={jobTag}
                                        name="colors"
                                        options={options}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                        onChange={(e) => setJobTag(e)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Company</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Address</Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Publish</Form.Label>
                                    <Select
                                        value={publish}
                                        name="colors"
                                        options={choices}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                        onChange={(e) => setPublish(e)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Salary</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={(e) => {
                                            setWage(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles.label}>
                                        Amount Required
                  </Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <button type="button" className="my-2 btn btn-primary">
                                    Save
                </button>
                            </Col>
                            <Col md={6}>
                                <button type="button" className="my-2 btn btn-primary">
                                    Cancel
                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    );
};

export default EditJobDetails;
