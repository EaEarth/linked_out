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

            <Container className="my-4">
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
                    <Col md={{ span: 5 }} className='mx-auto mt-5'>
                        <h2>Information</h2>
                        <Row className='mx-auto'>
                            <p className="font-weight-bold my-2 mr-2">First Name :</p>
                            <p className="m-2">{application.applicant.firstname}</p>
                            <p className="font-weight-bold m-2">last Name :</p>
                            <p className="ml-2 my-2">{application.applicant.lastname}</p>
                        </Row>
                        <Row className='mx-auto'>
                            <p className="font-weight-bold my-2 mr-2">Address :</p>
                            <p className="ml-2 my-2">{application.applicant.address}</p>
                        </Row>
                        <Row className='mx-auto'>
                            <p className="font-weight-bold my-2 mr-2">Age :</p>
                            <p className="ml-2 my-2">{dayjs().diff(dayjs(application.applicant.birthDate), 'year')}</p>
                        </Row>
                        <Row className='mx-auto'>
                            <p className="font-weight-bold my-2 mr-2">TelNumber :</p>
                            <p className="ml-2 my-2">{application.applicant.telNumber}</p>
                        </Row>
                        <Row className='mx-auto'>
                            <p className="font-weight-bold my-2 mr-2">Email :</p>
                            <p className="ml-2 my-2">{application.applicant.email}</p>
                        </Row>
                        <p className="font-weight-bold my-2">Experience Summary</p>
                        <p className="my-2">{application.experience}</p>
                        <p className="font-weight-bold my-2">Education Summary</p>
                        <p className=" my-2">{application.education}</p>
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
                        <p>{application.feedback}</p>
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