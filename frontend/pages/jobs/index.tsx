import Head from 'next/head';
import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';

export const Jobs = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Job Announcements - LinkedOut</title>
      </Head>
      <Container>
        <Row>
          <Col>
          <Link href="/test">Click me!</Link>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              elementum, sem malesuada venenatis feugiat, nunc orci efficitur
            odio. Cras volutpat tellus sed
              ligula suscipit rhoncus. Ut tempor erat vel leo commodo bibendum.
              Nam lacus lacus, eleifend quis magna et, bibendum finibus justo.
              Sed blandit laoreet dapibus. Vestibulum rhoncus ligula at
              dignissim pharetra. Ut suscipit dui a ante rutrum, ac dictum
              mauris ultrices. Fusce elementum libero ac tellus pharetra, et
              ullamcorper justo eleifend. Duis felis orci, tempus a tincidunt
              et, tincidunt a urna. Proin dictum dignissim tortor sed imperdiet.
              Vivamus a neque in libero tempor molestie et at lorem.
            </p>
            <p>
              Sed ac porta mauris. Maecenas interdum semper lacus, at molestie
              nulla porttitor mattis. Duis ultrices ac dolor convallis molestie.
              Vivamus vitae rutrum odio. Suspendisse sit amet orci dolor.
              Integer eros massa, condimentum ut leo quis, auctor consequat
              felis. Phasellus commodo diam mauris, sed varius leo mattis nec.
              Proin ac ex vitae lacus blandit pretium. Nam nec vehicula elit.
              Curabitur rutrum felis quis eros elementum, quis semper arcu
              maximus. Nam pharetra magna sit amet vehicula bibendum. Etiam elit
              massa, facilisis ut ornare sed, pellentesque id lacus.
            </p>
            <p>
              Praesent viverra leo sem, pharetra dictum quam aliquet et. Ut
              vitae accumsan dolor. Integer eu tortor ipsum. Cras vel justo
              tortor. Ut scelerisque, tellus quis luctus venenatis, enim nisi
              gravida purus, et rutrum arcu odio at justo. Vestibulum
              pellentesque porttitor enim. Ut vel condimentum est, sit amet
              placerat mauris. Nulla a placerat nulla. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              In blandit justo ligula, id feugiat eros elementum eu. Etiam sem
              elit, fringilla non justo ut, pulvinar vulputate risus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Ut vitae condimentum enim. Mauris efficitur
              tellus quis ex eleifend lacinia.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Sed rutrum massa vitae libero
              ornare tristique. Donec fringilla nisl sapien. Pellentesque ut
              lorem lobortis, tincidunt ipsum in, varius neque. Aliquam erat
              volutpat. Ut gravida purus vel eros mollis posuere. Fusce varius
              libero a odio sollicitudin, ac sagittis tellus scelerisque.
              Vestibulum porttitor diam vitae nunc gravida consectetur. Duis
              consectetur a libero rhoncus venenatis.
            </p>
            <p>
              Donec ornare nulla ut vulputate semper. Fusce non magna sagittis,
              consectetur velit quis, lacinia tellus. Phasellus quis mauris
              tempus, sagittis risus quis, euismod elit. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Cras risus dui, fringilla sit amet diam id, molestie interdum
              nulla. Vestibulum vitae dignissim tortor. Cras fermentum nunc eu
              urna congue, eget hendrerit magna elementum. Duis vel sollicitudin
              mauris, nec condimentum purus. Integer a mattis est. Aliquam
              lobortis pulvinar velit, ac dapibus risus auctor eu. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Donec vestibulum lorem in quam interdum, sit amet
              gravida augue euismod. Sed quis dui et ex varius vulputate ut eu
              neque. In eget consequat ipsum. Fusce molestie faucibus tellus, eu
              efficitur metus consectetur sit amet. Nam tellus dolor,
              sollicitudin et leo ut, tempus volutpat eros.
            </p>{' '}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Jobs;
