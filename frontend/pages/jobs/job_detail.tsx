import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';

export const JobDetails = () => {
  const [company, setCompany] = useState(null);

  return (
    <DefaultLayout>
      <Head>
        <title>Job Detail - {company} </title>
      </Head>
    
      <Container className="my-4">
        <Row>
          <Col md={{span: 5, offset: 1}} className = ''>
            <h1 className='text-center'>Programmer</h1>
            <Image src="https://yt3.ggpht.com/ytc/AAUvwnhUBs4JKxqqhiSXJDV42qujaYi07mdEuUIp5ESw1g=s900-c-k-c0x00ffffff-no-rj" className='d-block w-75 mx-auto'rounded />
          </Col>
          <Col md={6} className='mx-auto mt-5'>
            <h4>Location:</h4>
            <p>
                <address>
                8 อาคารทีวัน ชั้น 26, 27  ซอยสุขุมวิท 40 แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110
                </address>
            </p>

            <h4>อัตราค่าจ้าง:</h4>
            <p>
            54000 - 70000  บาท
            </p>

            <h4>คุณสมบัติ:</h4>
            <p>
            ประสบการณ์ทำงาน 50 ปี รู้ภาษาในการเขียนโปรแกรม 10 ภาษาขึ้นไป
            </p>
         </Col> 
        </Row>
        <Row className = "">
            <Col md={{span: 5, offset: 1}} className = 'd-flex justify-content-center'>
                <Link href='/test'>
                <button type="button" className="my-2 btn btn-primary">Apply</button>
                </Link>
            </Col>
        </Row>
      </Container>
      
    </DefaultLayout>
  );
};

export default JobDetails ;
