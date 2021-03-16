import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, FormControl, FormLabel, ThemeProvider } from 'react-bootstrap';
import DefaultLayout from '../../../../layouts/Default';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import ApplicationForm from '../../../../models/ApplicationForm/ApplicationForm';
import dayjs from 'dayjs';
import style from './application.module.scss'
import { GetServerSidePropsContext } from 'next';

export const Response = (props) => {
    const router = useRouter();
    const [application] = useState(props.application);
    const [feedback, setFeedback] = useState('');
    const statusHandler = (status) => {
        if (status == 1) return 'waiting';
        else if (status == 2) return 'accepted';
        else return 'denied';
    }
    // useEffect(() => {
    //     if (application.status > 1) {
    //         const acceptButton = document.getElementById('acceptButton');
    //         const rejectButton = document.getElementById('rejectButton');
    //         acceptButton.setAttribute('disabled', 'disabled');
    //         rejectButton.setAttribute('disabled', 'disabled');
    //     }
    // }, [application.status]);
    const statusColorHandler = (status) => {
        if (status == 1) return 'secondary';
        else if (status == 2) return 'success';
        else return 'danger';
    }
    const handleAcceptClick = (e) => {
        e.preventDefault();
        handleSubmitClick(2);
    }
    const handleRejectClick = (e) => {
        e.preventDefault();
        handleSubmitClick(3);
    }
    const handleSubmitClick = async (status) => {
        const payload = {
            feedback: feedback,
            status: status,
            jobAnnouncementId: application.jobAnnouncement.id,
            resumeId: (application.resume) ? application.resume.id : null,
            coverLetterId: (application.coverLetter) ? application.coverLetter.id : null,
            transcriptId: (application.transcript) ? application.transcript.id : null,
        };
        try {
            await axios.patch(`/job-application/${application.id}`, payload)
                .then((response) => {
                    if (response.status === 200) {
                        router.push(`/jobs/list/applicant/${application.jobAnnouncement.id}`);
                    }
                })

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DefaultLayout>
            <Head>
                <title>Response - {application.jobAnnouncement.company} - {application.jobAnnouncement.title}</title>
            </Head>

            <Container className="my-4">
                <Row>
                    <Col className='text-center'>
                        <h1>Application Detail</h1>
                        <h3 className='mt-3'>{application.jobAnnouncement.company} - {application.jobAnnouncement.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className='mt-5'>
                        <Image src={application.applicant.avatarFile?.path || '/images/user/User.svg'} className='d-block w-75 mx-auto' rounded />
                    </Col>
                    <Col md={{ span: 5 }} className={`mx-auto mt-5 my-4 ${style['information']}`}>
                        <h2>Information</h2>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">First Name</Col>
                            <Col>{application.applicant.firstname}</Col>
                        </Row>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">Last Name</Col>
                            <Col>{application.applicant.lastname}</Col>
                        </Row>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">Address</Col>
                            <Col>{application.applicant.address}</Col>
                        </Row>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">Age</Col>
                            <Col>{dayjs().diff(dayjs(application.applicant.birthDate), 'year')}</Col>
                        </Row>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">TelNumber</Col>
                            <Col>{application.applicant.telNumber}</Col>
                        </Row>
                        <Row className='mx-auto'>
                            <Col md={{ span: 3 }} className="font-weight-bold pl-0">Email</Col>
                            <Col>{application.applicant.email}</Col>
                        </Row>
                        <p className="font-weight-bold my-2">Experience Summary</p>
                        <p className="my-2">{application.experience == "" ? '-' : application.experience}</p>
                        <p className="font-weight-bold my-2">Education Summary</p>
                        <p className="">{application.education == "" ? '-' : application.education}</p>
                        {(application.resume) && (<Row className='d-block mx-auto'> <p className="font-weight-bold my-2">Resume</p>
                            <Link href={application.resume.path}>
                                <a>{application.resume.title}</a>
                            </Link></Row>
                        )}
                        {(application.coverLetter) && (<Row className='d-block mx-auto'> <p className="font-weight-bold my-2">Cover Letter</p>
                            <Link href={application.coverLetter.path}>
                                <a>{application.coverLetter.title}</a>
                            </Link>
                        </Row>
                        )}
                        {(application.transcript) && (<Row className='d-block mx-auto'> <p className="font-weight-bold my-2">transcript</p>
                            <Link href={application.transcript.path}>
                                <a>{application.transcript.title}</a>
                            </Link></Row>
                        )}
                        <Row className='mx-auto'>
                            <h4 className="my-2 mr-2">status: </h4>
                            <h4 className={'my-2 text-' + statusColorHandler(application.status)}>{statusHandler(application.status)}</h4>
                        </Row>

                        <h2>Feedback</h2>
                        {((application.status > 1) ? (<p className="">{application.feedback == "" ? '-' : application.feedback}</p>) :
                            <Form>
                                <Form.Group>
                                    <FormControl
                                        as="textarea" rows={3}
                                        id='feedback'
                                        placeholder="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)} />
                                </Form.Group>
                            </Form>
                        )}
                    </Col>
                </Row>
                {(application.status > 1) ? null :
                    (<Row className="">
                        <Col md={6}>
                            <button id="acceptButton" type="button" className="float-right my-2 btn btn-success" onClick={handleAcceptClick}>Accept</button>
                        </Col >
                        <Col md={6}>
                            <button id="rejectButton" type="button" className="float-left my-2 btn btn-danger" onClick={handleRejectClick}>Reject</button>
                        </Col>
                    </Row>)}
            </Container>
        </DefaultLayout >
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookie = context.req.cookies;
    const { data } = await axios.get<ApplicationForm[]>(`/job-application/index/${context.params.aid}`, {
        headers: {
            Cookie: `jwt=${cookie['jwt']}`,
        },
    });
    return {
        props: {
            application: data,
        }
    }
}

export default Response;