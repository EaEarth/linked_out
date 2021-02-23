import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';

export const EditJobDetails = (props) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [jobTag, setJobTag] = useState(Array<String>());
  const [company, setCompany] = useState(null);
  const [location, setLocation] = useState(null);
  const [publish, setPublish] = useState(null);
  const [minWage, setMinWage] = useState(null);
  const [maxWage, setMaxWage] = useState(null);
  const [amount, setAmount] = useState(null);
  const [province, setProvince] = useState(null);
  const [successMessage, setMessage] = useState(null);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'cookie', label: 'Cookies' },
    { value: 'trash', label: 'Trash' },
  ];
  const choices = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  let tagArr=[]

  const handleSubmitClick = (e) => {
    const payload = {
      title: title,
      description: description,
      tag: jobTag,
      company: company,
      address: location,
      province: province,
      lowerBoundSalary: minWage,
      upperBoundSalary: maxWage,
      amountRequired: amount
    };
    for(let i = 0; i<jobTag.length; ++i){
      tagArr.push(jobTag[i]['value'])
    }
    // axios.patch(`http://localhost:8000/api/job/${context.params.id}`,payload)
    //     .then(function (response){
    //         if(response.status == 202) {
    //             setMessage('Update successful. Redirecting to job page..');
    //             const router = useRouter();
    //             router.push("/jobs");
    //         } else{
    //             console.log("There is an Error")
    //         }
    //     })
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Edit Job Detail</title>
      </Head>

      <Container className="my-4">
        <Row>
          <Col md={6}>
            <Row>
              <Image
                src="/images/user/User.svg"
                className="d-block w-30 mx-auto"
                rounded
              />
            </Row>
            <Row className="d-flex justify-content-center my-2">
              <button type="button" className="my-2 btn btn-primary">
                Add Picture
              </button>
            </Row>
            <Row className="d-flex justify-content-center my-2">
              <Form>
                  <Form.Group>
                    <Form.Label className={styles.label}>Title</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="text"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={styles.label}>Description</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="text"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Job Tag</Form.Label>
                  <Select
                    value={jobTag}
                    name="colors"
                    options={options}
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => {setJobTag(e); console.log(e)}}
                    isMulti
                  />
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Form>
                <Form.Group>
                  <Form.Label className={styles.label}>Company</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Company"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Address</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Province</Form.Label>
                  <Select
                    value={province}
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProvince(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Minimum salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Minimum salary"
                    onChange={(e) => {
                      setMinWage(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Maximum salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Maximum salary"
                    onChange={(e) => {
                      setMaxWage(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Amount Required
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check type="checkbox" className = "form-control-lg" label="Publish" onClick={()=>setPublish(!publish)}/>
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
        <Row className="text-center">
         <Col md={6}>
            <button type="button" className="my-2 btn btn-primary btn-lg float-right" onClick={handleSubmitClick}>
              Save
            </button>
          </Col >
          <Col md={6}>
            <button type="button" className="my-2 btn btn-primary btn-lg float-left">
              Cancel
            </button>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default EditJobDetails;
