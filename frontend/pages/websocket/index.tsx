import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLifecycles, useMount } from "react-use";
import DefaultLayout from "../../layouts/Default";
import { useRootStore } from "../../stores/stores";

export const WebSocket = observer((props) => {
  const webSocketStore = useRootStore().webSocketStore;
  useLifecycles(() => {
    webSocketStore.connect();
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
            <button className="btn btn-primary mr-2" onClick={() => {
              if (webSocketStore.isConnected) webSocketStore.close();
              else webSocketStore.connect();
            }}>{webSocketStore.isConnected ? 'Disconnect' : 'Connect'}</button>
            <button className="btn btn-secondary" onClick={() => {
              webSocketStore.socket.emit('msgToServer', 'ทดสอบ');
            }}>Send message</button>
            <p>Messages({webSocketStore.messages.length}): </p>
            <ul>{webSocketStore.messages.map((each, i) =>
              <li key={i}>{each}</li>
            )}</ul>

          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  </>;
});

export default WebSocket;