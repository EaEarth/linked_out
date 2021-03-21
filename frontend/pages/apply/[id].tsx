import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, FormControl } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { ApplyModal } from '../../components/JobApply/modal';
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../stores/stores';

export const appForm = (props) => {
    const router = useRouter();
    const applicationStore = useRootStore().applicationStore;
    const [modalShow, setModalShow] = useState(false);
    const [jobDetails] = useState(props.jobDetails);
    const [profile] = useState(props.profile);
    const [state, setState] = useState({
        firstName: profile.firstname,
        lastName: profile.lastname,
        address: profile.address,
        age: dayjs().diff(dayjs(profile.birthDate), 'year'),
        phone: profile.telNumber,
        email: profile.email,
        experience: '',
        education: '',
        resume: null,
        coverLetter: null,
        transcript: null,
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { id } = e.target;
        const file = e.target.files[0];
        setState((prevState) => ({
            ...prevState,
            [id]: file,
        }));
    };
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const payload = {
            experience: state.experience,
            education: state.education,
            jobAnnouncementId: jobDetails.id,
            resumeId: null,
            transcriptId: null,
            coverLetterId: null
        };
        if (state.resume) {
            await applicationStore.uploadFile(state.resume);
            payload['resumeId'] = applicationStore.id;
        }
        if (state.coverLetter) {
            await applicationStore.uploadFile(state.coverLetter);
            payload['coverLetterId'] = applicationStore.id;
        }
        if (state.transcript) {
            await applicationStore.uploadFile(state.transcript);
            payload['transcriptId'] = applicationStore.id;
        }
        await applicationStore.apply(payload);
        setModalShow(applicationStore.show);
    };


    return (
        <DefaultLayout>
            <Head>
                <title>Apply - {jobDetails.company} - {jobDetails.title}</title>
            </Head>

            <Container className="my-4">
                <Row>
                    <Col className='text-center'>
                        <h1>Application Form</h1>
                        <h3 className='mt-3'>{jobDetails.company} - {jobDetails.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className='mt-5'>
                        <Image src={profile.avatarFile?.path || '/images/user/User.svg'} className='d-block w-75 mx-auto' rounded />
                    </Col>
                    <Col md={{ span: 5 }} className='mx-auto mt-5'>
                        <h2>Information</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <FormControl
                                    type="text"
                                    id="firstName"
                                    placeholder={state.firstName}
                                    value={state.firstName}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <FormControl
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={state.lastName}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <FormControl
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    value={state.address}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <FormControl
                                    type="text"
                                    id='age'
                                    placeholder="Age"
                                    value={state.age}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <FormControl
                                    type="text"
                                    id='phone'
                                    placeholder="Phone Number"
                                    value={state.phone}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <FormControl
                                    type="email"
                                    id='email'
                                    placeholder="Email"
                                    value={state.email}
                                    onChange={handleChange}
                                    disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Experience Summary (Optional)</Form.Label>
                                <FormControl
                                    as="textarea" rows={3}
                                    id='experience'
                                    placeholder="Experience"
                                    value={state.experience}
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Education Summary (Optional)</Form.Label>
                                <FormControl
                                    as="textarea" rows={3}
                                    id='education'
                                    placeholder="Education"
                                    value={state.education}
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    className="w-75  mb-3"
                                    label='Resume (Optional)'
                                    id='resume'
                                    onChange={handleFileChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    className="w-75 mb-3"
                                    label='Cover Letter (Optional)'
                                    id='coverLetter'
                                    onChange={handleFileChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    className="w-75 mb-3"
                                    label='transcript (Optional)'
                                    id='transcript'
                                    onChange={handleFileChange} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="">
                    <Col md={6}>
                        <button type="button" className="float-right my-2 btn btn-success" onClick={handleSubmitClick}>Submit</button>
                        <ApplyModal show={modalShow} onHide={() => setModalShow(false)} />
                    </Col >
                    <Col md={6}>
                        <button type="button" className="float-left my-2 btn btn-danger" onClick={() => router.back()}>Cancel</button>
                    </Col>
                </Row>
            </Container>

        </DefaultLayout >
    );
};


export async function getServerSideProps(context) {
    const cookie = context.req.cookies;
    const { data } = await axios.get(`/job/index/${context.params.id}`);
    const profile = await axios.get(`/users/profile`, {
        headers: {
            Cookie: `jwt=${cookie['jwt']}`,
        },
    });
    return {
        props: {
            jobDetails: data,
            profile: profile.data
        }
    }
}

export default appForm;