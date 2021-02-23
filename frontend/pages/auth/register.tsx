import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import { symlink } from 'fs/promises';

export const Register = (props) => {
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        birthDate: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            console.log("incorrect password");
        }
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                username: state.username,
                password: state.password,
                email: state.email,
                prefix: "Mr.",
                firstname: state.firstname,
                lastname: state.lastname,
                birthDate: state.birthDate,
                address: state.address,
                "latitude": 12,
                "longtitude": 13,
                telNumber: state.phone
            }
            axios.post('http://localhost:8000/api/users', payload)
                .then(function (response) {
                    if (response.status === 201) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        window.location.href = "/test";
                    } else {
                        console.log("some error occur");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('Please enter valid username and password')
        }
    }
    return (
        <DefaultLayout>
            <Head>
                <title>Register</title>
            </Head>

            <Container className="my-4">
                <Row>
                    <Col md={{ span: 5, offset: 1 }} className=''>
                        <Form>
                            <Form.Group>
                                <i className="bi bi-person-fill"></i>
                                <Form.Control type="text" id="username" value={state.username} placeholder="Username" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" id="firstname" value={state.firstname} placeholder="Firstname" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" id="lastname" value={state.lastname} placeholder="Lastname" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <i className="bi bi-envelope-fill"></i>
                                <Form.Control type="email" id="email" value={state.email} placeholder="Email" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <i className="bi bi-geo-alt-fill"></i>
                                <Form.Control type="text" id="address" value={state.address} placeholder="Address" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <i className="bi bi-telephone-fill"></i>
                                {/* <PhoneInput country={'th'} placeholder="Phone Number" onChange={(value) => setPhoneNumber(value)}/> */}
                                <Form.Control type="text" id="phone" value={state.phone} placeholder="Phone" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Birthdate</Form.Label>
                                <Form.Control type="date" id="birthDate" value={state.birthDate} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <i className="bi bi-key-fill"></i>
                                <Form.Control type="password" id="password" value={state.password} placeholder="Password" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" id="confirmPassword" value={state.confirmPassword} placeholder="Confirm Password" onChange={handleChange} />
                            </Form.Group>

                            <Link href="/test">
                                <button type="button" className="my-2 btn btn-primary" onClick={handleSubmitClick}>Register</button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </DefaultLayout>
    );
};

export default Register;

