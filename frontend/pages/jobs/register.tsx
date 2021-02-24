import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row, Form, Button } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Select from 'react-select';
import { profile } from 'console';

type tempErrors = {
  title: string | null;
  description: string | null;
  jobTag: string | null;
  company: string | null;
  address: string | null;
  publish: string | null;
  lowerBoundSalary: string | null;
  upperBoundSalary: string | null;
  amount: string | null;
  profilePic: string | null;
}


export const RegisterJobAnnouncement = (props) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobTag, setJobTag] = useState( Array<String>() );
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [publish, setPublish] = useState(false);
  const [lowerBoundSalary, setLowerBoundSalary] = useState(0);
  const [upperBoundSalary, setUpperBoundSalary] = useState(0);
  const [amount, setAmount] = useState(0);
  const [province, setProvince] = useState(0);
  const [profilePic, setProfile] = useState(null);
  const [urlPicture, setURLPicture] = useState(null);
  const [errors, setError] = useState({title:null,description:null,jobTag:null,company:null,address:null,publish:null,lowerBoundSalary:null,upperBoundSalary:null ,amount:null});

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

  useEffect(() =>{
    if(profilePic==null) return
    const url = URL.createObjectURL(profilePic)
    setURLPicture(url)

    return () => URL.revokeObjectURL(url)
  },[profilePic])

  const createJobDetailsToServer = async () => {
      let temp_errors: tempErrors | null = {title:null,description:null,jobTag:null,company:null,address:null,publish:null,lowerBoundSalary:null,upperBoundSalary:null ,amount:null, profilePic:null};; 
      let checkError = false;
      if(!title.length){
        temp_errors.title = "The title is required";
        checkError = true;
      }
      if(!description.length){
        temp_errors.description = "The description is required"
        checkError = true;
      }
      if(!jobTag.length){
        temp_errors.jobTag = "The tags are required to be at least 1"
        checkError = true;
      }
      if(!company.length){
        temp_errors.company = "The company is required"
        checkError = true;
      }
      if(!address.length){
        temp_errors.address = "The address is required"
        checkError = true;
      }
      if(lowerBoundSalary<=0){
        temp_errors.lowerBoundSalary = "The lowerbound salary is required"
        checkError = true;
      }
      if(upperBoundSalary<=0){
        temp_errors.upperBoundSalary = "The upperbound salary is required"
        checkError = true;
      }
      if(amount<=0){
        temp_errors.amount = "The amount is required"
        checkError = true;
      }
      setError(temp_errors);
      if(checkError){
        return
      }
  
      let tags = [];
      for(let i=0;i<jobTag.length;i++){
          tags.push(jobTag[i]['value']);
      }

      const payload = {
          title: title,
          description: description,
          lowerBoundSalary: Number(lowerBoundSalary),
          upperBoundSalary: Number(upperBoundSalary),
          province: "กรุงเทพ",
          tag: tags,
          company: company,
          address: address,
          isPublished: publish,
          amountRequired: Number(amount),
          pictureId: 1
      }
      if(profilePic){
        let formData = new FormData()
        formData.append('file',profilePic,profilePic.name)
        await axios.post('http://localhost:8000/api/files/upload',formData)
        .then((response) => {
          if(response.status == 201) {
            payload['pictureId'] = Number(response.data.id)
  
          } else{
            console.log("There is an error in uploaded picture")
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
      await axios.post('http://localhost:8000/api/job',payload)
        .then(function (response){
          if(response.status == 201) {
              router.push("/jobs");
          } else{
              console.log("There is an Error")
          }
        })
        .catch(function (error){
            console.log(error)
        });
        
  }

  const fileChangedHandler = (e) => {
      setProfile(e.target.files[0])
  }
  
  return (
    <DefaultLayout>
      <Head>
        <title>Creating Job Announcements</title>
      </Head>

      <Container className="my-4">
        <Row>
          <Col md={{ span: 5, offset: 1 }} className="d-flex flex-column">
            <Row className="mt-4">
              {!profilePic ?
              <Image
                src="/images/user/User.svg"
                className="d-block w-50 mx-auto"
                rounded
              />:
              <Image
                className="d-block w-75 mx-auto"
                src={urlPicture}
                rounded
              />
              }
            </Row>
            <Row>
                <Form className="w-100 p-3">
                    <Form.Group>
                    <Form.File className="d-flex justify-content-center w-75 mx-auto mb-3" label={!urlPicture?  "Profile picture": "Success upload"} data-browse="Add profile" onChange={fileChangedHandler} custom/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label className={styles.label}>Title</Form.Label>
                    <Form.Control
                        id="title"
                        className="form-control"
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label className={styles.label}>Description</Form.Label>
                    <Form.Control
                        id="description"
                        rows={5}
                        as="textarea"
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                </Form>
            </Row>
          </Col>

          <Col md={{ span: 5, offset: 1 }} >
            <Row>
              <Form className="w-100 p-3">
                <label className={styles.label}>Tag</label>
                <Select
                    isMulti
                    value={jobTag}
                    name="colors"
                    options={
                        jobTag.length >=3 ? jobTag : options
                    }
                    isSearchable="true"
                    maxMenuHeight={200}
                    noOptionsMessage={()=>"You could only assign 3 tags to Job Announcement"}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={ (e) => setJobTag(e)}
                    />
                <small className="text-danger">{errors.jobTag}</small>
                <Form.Group className="mt-3">
                  <Form.Label className={styles.label}>Company</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="company"
                    onChange={(e) => setCompany(e.target.value)}
                    isInvalid={!!errors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.company}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Address</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="address"
                    onChange={(e) => setAddress(e.target.value)}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Lowerbound salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Lowerbound salary"
                    onChange={(e) => {
                      setLowerBoundSalary(Number(e.target.value));
                    }}
                    step={10}
                    isInvalid={!!errors.lowerBoundSalary}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.lowerBoundSalary}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Upperbound salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Upperbound salary"
                    onChange={(e) => {
                      setUpperBoundSalary(Number(e.target.value));
                    }}
                    step={10}
                    isInvalid={!!errors.upperBoundSalary}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.upperBoundSalary}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Amount of people required
                  </Form.Label>
                  <Form.Control
                    placeholder="amount"
                    type="number"
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check type="checkbox" label="Publish" onClick={()=>setPublish(!publish)}/>
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row className="text-center">
                <Col className="my-2">
                <button type="button" className="mr-5 btn btn-primary" onClick={createJobDetailsToServer}>
                  Create
                </button>
                <button type="button" className="ml-5 btn btn-primary" onClick={()=>{
                  router.push('/jobs')
                }}>
                  Cancel
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default RegisterJobAnnouncement;
