import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import axios from 'axios';

export const job = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
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
        const payload = {
            username: state.username,
            password: state.password
        }
        axios.post('http://localhost:8000/api/auth/login', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))
                    //localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    //redirectToHome();
                } else if (response.status === 401) {
                    props.showError("Username and password do not match");
                } else {
                    console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
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

                            <Link href="/test">
                                <button type="button" className="my-2 btn btn-primary" onClick={handleSubmitClick}>Login</button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </DefaultLayout>
    );
};

export default job;