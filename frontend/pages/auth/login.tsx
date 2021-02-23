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
        error: null
    })

    useEffect(() => {
        if (props.cookie.hasOwnProperty('jwt')) {
            router.push('/');
        }
    });

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
                    error: "Username or password is incorrect."
                }))
            });
    }
    return (
        <DefaultLayout>
            <Head>
                <title>Login</title>
            </Head>

            <Container className="">
                <Row className="justify-content-center">
                    <Col md={{ span: 5 }}>
                        <h3>Link Out</h3>
                        <Form>
                            <Form.Group className="">
                                <Form.Control type="text" id="username" value={state.username} placeholder="Username" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" id="password" value={state.password} placeholder="Password" onChange={handleChange} />
                            </Form.Group>

                            <div>
                                <p className="text-danger">{state.error}</p>
                            </div>

                            <Link href="/test">
                                <a className="">forget password?</a>
                            </Link>

                            <button type="button" className="my-2 btn btn-primary" onClick={handleSubmitClick}>Login</button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </DefaultLayout>
    );
};

export async function getServerSideProps(context) {
    const cookies = context.req.cookies;
    return {
        props: {
            cookie: cookies
        }
    }
}

export default login;