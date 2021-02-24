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
          <Col md={{ span: 5 }}>
            <h3>Link Out</h3>
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
              </Form.Group>

              <div>
                <p className="text-danger">{authStore.loginError}</p>
              </div>

              <Link href="/test">
                <a className="">forget password?</a>
              </Link>

              <button
                type="button"
                className="my-2 btn btn-primary"
                onClick={handleSubmitClick}>
                Login
              </button>
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
