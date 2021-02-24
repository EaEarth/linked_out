import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import axios from 'axios';

export const login = (props) => {
    const router = useRouter();
    const [state, setState] = useState({
        username: "",
        password: "",
        error: ""
    })

    // useEffect(() => {
    //     if (props.cookies.hasOwnProperty('jwt')) {
    //         router.push('/');
    //     }
    // });

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            username: state.username,
            password: state.password
        }
        axios.post('http://localhost:8000/api/auth/login', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                    }))
                    router.push('/');
                    // } else if (response.status === 401) {
                    //     console.log("Username and password do not match");
                    // } else {
                    //     console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                setState(prevState => ({
                    ...prevState,
                    error: "username or password is incorrect."
                }))
            });
    }
    return (
        <DefaultLayout>
            <Head>
                <title>Login</title>
            </Head>

            <Container className="">
                <Row className="d-flex justify-content-center my-5">
                    <Col md={{ span: 4 }}>
                        <h2 className="text-center my-3">Login</h2>
                        <Form>
                            <Form.Group className="">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" id="username" value={state.username} placeholder="Username" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" id="password" value={state.password} placeholder="Password" onChange={handleChange} />
                                <p className=" text-danger d-block text-start ml-2">{state.error}</p>
                            </Form.Group>

                            <Row className="d-flex justify-content-center">
                                <button type="button" className="my-2 btn btn-primary" onClick={handleSubmitClick}>Login</button>
                            </Row>

                            <Link href="/test">
                                <a className="d-block text-center ">forget password?</a>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </DefaultLayout >
    );
};

export async function getServerSideProps(context) {
    const cookie = context.req.cookies;
    return {
        props: {
            cookies: cookie
        }
    }
}

export default login;