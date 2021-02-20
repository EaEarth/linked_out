import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Select from 'react-select';
import Link from 'next/link';

export const Jobs = () => {
    const [position, setPosition] = useState("")
    const [jobTypes, setJobTypes] = useState<Array<String>>([])
    const [wage, setWage] = useState(null)

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'cookie', label: 'Cookies' },
        { value: 'trash', label: 'Trash' }
    ]

    return (
        <DefaultLayout>
            <Head>
                <title>BrowseJob - LinkedOut</title>
            </Head>
            <Container>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className=''>
                        <h1>Browse Job</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label>Position :</Form.Label>
                                <Form.Control className="m-4 form-control" type="text" onChange={(e) => setPosition(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Job Type :</Form.Label>
                                <Select
                                    isMulti
                                    value={jobTypes}
                                    name="colors"
                                    options={
                                        jobTypes.length >= 3 ? jobTypes : options
                                    }
                                    className="basic-multi-select m-4"
                                    classNamePrefix="select"
                                    onChange={(e) => setJobTypes(e)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Wage :</Form.Label>
                                <Form.Control className="m-4" type="number" onChange={(e) => { setWage(e.target.value); }} style={{ width: "150px" }} />
                            </Form.Group>

                            <Link href="/test">
                                <button type="button" className="my-2 btn btn-primary">Submit</button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    );
};

export default Jobs;