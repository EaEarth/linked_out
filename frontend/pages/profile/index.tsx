import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, FormControl } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { useRootStore } from '../../stores/stores';

export const editProfile = (props) => {
    const router = useRouter();
    const applicationStore = useRootStore().applicationStore;
    const [profile, setProfile] = useState(props.profile);
    const [urlPic, setURLPic] = useState(null);
    const [required, setRequired] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phone: '',
    })

    useEffect(() => {
        if (profile.profilePic == null) return
        const url = URL.createObjectURL(profile.profilePic)
        setURLPic(url)

        return () => URL.revokeObjectURL(url)
    }, [profile.profilePic])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { id } = e.target;
        const file = e.target.files[0];
        setProfile((prevState) => ({
            ...prevState,
            [id]: file,
        }));
    };
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        let allInfo = true;
        if (!profile.firstname.length) {
            setRequired((prevRequired) => ({ ...prevRequired, firstname: "*required" }));
            allInfo = false;
        } else setRequired((prevRequired) => ({ ...prevRequired, firstname: "" }));

        if (!profile.lastname.length) {
            setRequired((prevRequired) => ({ ...prevRequired, lastname: "*required" }));
            allInfo = false;
        } else setRequired((prevRequired) => ({ ...prevRequired, lastname: "" }));

        if (!profile.address.length) {
            setRequired((prevRequired) => ({ ...prevRequired, address: "*required" }));
            allInfo = false;
        } else setRequired((prevRequired) => ({ ...prevRequired, address: "" }));

        if (!profile.email.length) {
            setRequired((prevRequired) => ({ ...prevRequired, email: "*required" }));
            allInfo = false;
        } else setRequired((prevRequired) => ({ ...prevRequired, email: "" }));

        if (!profile.telNumber.length) {
            setRequired((prevRequired) => ({ ...prevRequired, phone: "*required" }));
            allInfo = false;
        } else setRequired((prevRequired) => ({ ...prevRequired, phone: "" }));

        if (!allInfo) {
            return
        }
        const payload = {
            email: profile.email,
            prefix: profile.prefix,
            firstname: profile.firstname,
            lastname: profile.lastname,
            address: profile.address,
            telNumber: profile.telNumber,
            avatarFileId: profile.avatarFile?.id || null,
        };
        if (profile.profilePic != null) {
            await applicationStore.uploadFile(profile.profilePic);
            payload['avatarFileId'] = applicationStore.id;
        }
        await axios.patch('/users', payload)
            .then((response) => {
                if (response.status === 200) {
                    router.reload();
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Profile</title>
            </Head>

            <Container className="my-4">
                <Row>
                    <Col className='text-center'>
                        <h1>Edit Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className='mt-5'>
                        <Image src={urlPic || profile.avatarFile?.path || '/images/user/User.svg'} className='my-2 d-block w-75 mx-auto' rounded />
                        <Form>
                            <Form.Group>
                                <Form.File id="profilePic" className="d-flex justify-content-center w-75 mx-auto mb-3" label="Profile picture" data-browse="Add profile" onChange={handleFileChange} custom />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={{ span: 5 }} className='mx-auto mt-5'>
                        <h2>Information</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <FormControl
                                    type="text"
                                    id="prefix"
                                    as="select"
                                    value={profile.prefix}
                                    onChange={handleChange}
                                    custom
                                >
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </FormControl>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <FormControl
                                    type="text"
                                    id="firstname"
                                    placeholder="First Name"
                                    value={profile.firstname}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!required.firstname}
                                />
                                <FormControl.Feedback type="invalid">
                                    {required.firstname}
                                </FormControl.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <FormControl
                                    type="text"
                                    id="lastname"
                                    placeholder="Last Name"
                                    value={profile.lastname}
                                    onChange={handleChange}
                                    isInvalid={!!required.lastname}
                                />
                                <FormControl.Feedback type="invalid">
                                    {required.lastname}
                                </FormControl.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <FormControl
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    isInvalid={!!required.address}
                                />
                                <FormControl.Feedback type="invalid">
                                    {required.address}
                                </FormControl.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birth Date</Form.Label>
                                <FormControl
                                    type="date"
                                    id='birthDate'
                                    placeholder="Birth Date"
                                    value={profile.birthDate}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <FormControl
                                    type="text"
                                    id='telNumber'
                                    placeholder="Phone Number"
                                    value={profile.telNumber}
                                    onChange={handleChange}
                                    isInvalid={!!required.phone}
                                />
                                <FormControl.Feedback type="invalid">
                                    {required.phone}
                                </FormControl.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <FormControl
                                    type="email"
                                    id='email'
                                    placeholder="Email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    isInvalid={!!required.email}
                                />
                                <FormControl.Feedback type="invalid">
                                    {!!required.email}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="">
                    <Col md={6}>
                        <button type="button" className="float-right my-2 btn btn-success" onClick={handleSubmitClick}>Submit</button>
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
    const { data } = await axios.get(`/users/profile`, {
        headers: {
            Cookie: `jwt=${cookie['jwt']}`,
        },
    });
    return {
        props: {
            profile: data
        }
    }
}

export default editProfile;