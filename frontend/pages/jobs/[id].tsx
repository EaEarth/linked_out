import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'

const mockDetails = [
  {
    id: 1,
    address: '8 อาคารทีวัน ชั้น 26, 27  ซอยสุขุมวิท 40 แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110',
    salary: '54000-70000',
    requirement: 'ประสบการณ์ทำงาน 50 ปี รู้ภาษาในการเขียนโปรแกรม 10 ภาษาขึ้นไป',
    company: 'Wongnai',
    image: '/images/company/wongnai.jpg',
  },
  {
    id: 2,
    address: 'เลขที่ 114/3 ถนนซุปเปอร์ไฮเวย์ ซอยโพธาราม 1 ตำบลช้างเผือก อำเภอเมืองเชียงใหม่ เชียงใหม่ 50300',
    salary: '9000-10000',
    requirement: 'ประสบการณ์ทำงาน 50 ปี รู้ภาษาในการเขียนโปรแกรม 10 ภาษาขึ้นไป',
    company: 'Thinknet',
    image: '/images/company/thinknet.jpg',
  },
  {
    id: 3,
    address: '323 อาคารยูไนเต็ดเซ็นเตอร์ ชั้น 6 ห้อง 601 ถนนสีลม แขวงสีลม เขตบางรัก กทม. 10500 โทร. 02 353 6900',
    salary: '5000-100000',
    requirement: 'Poonpipat',
    company: 'Thinknet',
    image: '/images/company/thinknet.jpg',
  },
  {
    id: 4,
    address: '51 Naradhiwas Rajanagarindra Rd, Silom, Bang Rak, Bangkok 10500',
    salary: '50000-100000',
    requirement: 'Tanapong',
    company: 'Bluebik',
    image: '/images/company/bluebik.jpg',
  },
]


export const JobDetails = (props) => {
  const jobDetails = props.jobDetails

  return (
    <DefaultLayout>
      <Head>
        <title>Job Detail - {jobDetails.company}</title>
      </Head>
    
      <Container className="my-4">
        <Row>
          <Col md={{span: 5, offset: 1}} className = ''>
            <h1 className='text-center'>Programmer</h1>
            <Image src={jobDetails.image} className='d-block w-75 mx-auto'rounded />
          </Col>
          <Col md={6} className='mx-auto mt-5'>
            <h4>Location:</h4>
            <p>
                <address>
                {jobDetails.address}
                </address>
            </p>

            <h4>อัตราค่าจ้าง:</h4>
            <p>
            {jobDetails.salary}
            </p>

            <h4>คุณสมบัติ:</h4>
            <p>
            {jobDetails.requirement}
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

export async function getServerSideProps({ params }) {
  const id = Number(params.id)-1
  const details = mockDetails[id]
  return {
    props: {
      jobDetails: details
    }
  }
}

export default JobDetails;
