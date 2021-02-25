import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import { useRootStore } from '../../stores/stores';
import { observer } from 'mobx-react-lite';

export const login = observer((props) => {
  const authStore = useRootStore().authStore;
  const router = useRouter();
  const [state, setState] = useState({
    username: '',
    password: '',
    error: null,
  });

  useEffect(() => {
    authStore.loginError = null;
  }, []);

  useEffect(() => {
    if (authStore.isLoggedIn) {
      router.push('/');
    }
  }, [authStore.isLoggedIn]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password,
    };
    authStore.login(state.username, state.password);
  };
  return (
    <DefaultLayout>
      <Head>
        <title>Login</title>
      </Head>

      <Container className="">
        <Row className="justify-content-center">
          <Col md={{ span: 4 }}>
            <h2 className="text-center my-3">Login</h2>
            <Form>
              <Form.Group className="">
                <Form.Control
                  type="text"
                  id="username"
                  value={state.username}
                  placeholder="Username"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  id="password"
                  value={state.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <p className="text-danger d-block text-start ml-2">
                  {authStore.loginError}
                </p>
              </Form.Group>

              <Row className="d-flex justify-content-center">
                <button
                  type="button"
                  className="my-2 btn btn-primary"
                  onClick={handleSubmitClick}>
                  Login
                </button>
              </Row>
              <Link href="/test">
                <a className="d-block text-center ">forget password?</a>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
});

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  return {
    props: {
      cookie: cookies,
    },
  };
}

export default login;
