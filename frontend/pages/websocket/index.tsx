import { observer } from "mobx-react-lite";
import Head from "next/head";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLifecycles } from "react-use";
import DefaultLayout from "../../layouts/Default";
import { useRootStore } from "../../stores/stores";

export const WebSocket = observer((props) => {
  const webSocketStore = useRootStore().webSocketStore;
  useLifecycles(() => {
    webSocketStore.init();
  }, () => {
    webSocketStore.close();
  });
  return <>
    <DefaultLayout>
      <Head>
        <title>Web Socket Playgound</title>
      </Head>
      <Container className="my-4">
        <Row>
          <Col>
            <h1>Web Socket Playground</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Status: <span className={webSocketStore.isConnected ? 'text-success' : 'text-danger'}>
              {webSocketStore.isConnected ? 'Connected' : 'Disconnected'}
            </span>
            </p>
            <p>Url: {webSocketStore.url}</p>
            <button className="btn btn-primary" onClick={() => { console.log(webSocketStore.socket); }}>Connect</button>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  </>;
});

export default WebSocket;