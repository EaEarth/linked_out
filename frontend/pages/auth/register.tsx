import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Form, FormLabel } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2'

export const Register = () => {
    const [username, setUsername] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhoneNumber] = useState(null);
    const [birthDate,setBirthDate] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    return (
      <DefaultLayout>
        <Head>
          <title>Register</title>
        </Head>
      
        <Container className="my-4">
          <Row>
            <Col md={{span: 5, offset: 1}} className = ''>
                <Form>
                    <Form.Group controlId="formUserName">
                    <i className="bi bi-person-fill"></i>                        
                        <Form.Control className="d-inline" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formFirstName">
                        <Form.Control type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Control type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <i className="bi bi-envelope-fill"></i>
                        <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <i className="bi bi-geo-alt-fill"></i>
                        <Form.Control type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <i className="bi bi-telephone-fill"></i>
                        {/* <PhoneInput country={'th'} placeholder="Phone Number" onChange={(value) => setPhoneNumber(value)}/> */}
                        <Form.Control type="text" placeholder="Phone" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBirthDate">
                        <Form.Control type="date" onChange={(e) => setBirthDate(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <i className="bi bi-key-fill"></i>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
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

  export default Register;

