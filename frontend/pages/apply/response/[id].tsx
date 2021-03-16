import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, FormControl } from 'react-bootstrap';
import DefaultLayout from '../../../layouts/Default';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import ApplicationForm from '../../../models/ApplicationForm/ApplicationForm';
import dayjs from 'dayjs';
import style from './response.module.scss'
import { GetServerSidePropsContext } from 'next';

export const Response = (props) => {
    const router = useRouter();
    const [application] = useState(props.application);
    const statusHandler = (status) => {
        if (status == 1) return 'waiting';
        else if (status == 2) return 'accepted';
        else return 'denied';
    }
    const statusColorHandler = (status) => {
        if (status == 1) return 'secondary';
        else if (status == 2) return 'success';
        else return 'danger';
    }

    return (
        <DefaultLayout>
            <Head>
                <title>Response - {application.jobAnnouncement.company} - {application.jobAnnouncement.title}</title>
            </Head>

            <Container className=''>
                <Row>
                    <Col className='text-center'>
                        <h1>Application Response</h1>
                        <h3 className='mt-3'>{application.jobAnnouncement.company} - {application.jobAnnouncement.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className='mt-5'>
                        <Image src={application.applicant.avatarFile?.path || '/images/user/User.svg'} className='d-block w-75 mx-auto' rounded />
                    </Col>
                    <Col md={{ span: 5 }} className={`shadow-sm mx-auto mt-5 my-4 ${style['information']}`}>
                        <h2 className="mt-2">Information</h2>
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
                        <p className="mb-2">{application.feedback == '' ? '-' : application.feedback}</p>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout >
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookie = context.req.cookies;
    const { data } = await axios.get<ApplicationForm[]>(`/job-application/index/${context.params.id}`, {
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