import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from '../job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';

export const EditJobDetails = (props) => {
  const router = useRouter();
  const jobId = props.jobDetailId
  const [title, setTitle] = useState(props.jobDetail.title);
  const [description, setDescription] = useState(props.jobDetail.description);
  const [jobTag, setJobTag] = useState(props.jobTag);
  const [company, setCompany] = useState(props.jobDetail.company);
  const [location, setLocation] = useState(props.jobDetail.address);
  const [publish, setPublish] = useState(props.jobDetail.isPublished);
  const [minWage, setMinWage] = useState(props.jobDetail.lowerBoundSalary);
  const [maxWage, setMaxWage] = useState(props.jobDetail.upperBoundSalary);
  const [amount, setAmount] = useState(props.jobDetail.amountRequired);
  const [province, setProvince] = useState(props.jobDetail.province);
  const [successMessage, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(props.jobDetail.picture.path);
  const inputFile = useRef(null);

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

  const handleFileUpload = e => {
    const  files  = e.target.files;
    // console.log(files)
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
      
      setFileURL(URL.createObjectURL(e.target.files[0]))

      setFile(e.target.files[0]);
    }
  };

  const onFileButtonClick = () => {
    inputFile.current.click();
  };

  let tagArr=[]

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    let fileEntity = null;
    if(file !== null){
      let formData = new FormData()
      formData.append(
        'file',
        file,
        file.name
      )
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      fileEntity = await axios.post('http://localhost:8000/api/files/upload', formData)
    }
    for(let i = 0; i<jobTag.length; ++i){
      tagArr.push(jobTag[i]['value'])
    }
    const payload = {
      title: title,
      description: description,
      tag: tagArr,
      company: company,
      address: location,
      province: province ? province['value'] : null,
      lowerBoundSalary: parseInt(minWage),
      upperBoundSalary: parseInt(maxWage),
      amountRequired: parseInt(amount),
      isPublished: publish,
      pictureId: file !== null ? fileEntity.data.id : null,
    };
    axios.patch(`http://localhost:8000/api/job/${jobId}`,payload)
        .then(function (response){
            if(response.status == 200) {
                setMessage('Update successful. Redirecting to job page..');
                router.push("/jobs");
            } else{
                console.log("There is an Error")
            }
        })
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Edit Job Detail</title>
      </Head>

      <Container className="my-4">
        <Row>
          <Col md={6} 
            style={{
              width: "50%",
              paddingRight: 50
            }}>
            <Row>
              <Image
                src= {fileURL == null ? "/images/user/User.svg" : fileURL}
                height = "150"
                className="d-block w-30 mx-auto"
                rounded
              />

            </Row>
            <Row className="d-flex justify-content-center my-2">
              <input
                style={{ display: "none" }}
                // accept=".zip,.rar"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
              />
              <button type="button" className="my-2 btn btn-primary" onClick={onFileButtonClick}>
                Add Picture
              </button>
            </Row>
            <Row className="d-flex justify-content-center my-2" >
              <Form>
                  <Form.Group>
                    <Form.Label className={styles.label}>Title</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="text"
                      defaultValue={props.jobDetail.title}
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className={styles.label}>Description</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="text"
                      defaultValue={props.jobDetail.description}
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Job Tag</Form.Label>
                  <Select
                    //value={jobTag}
                    name="colors"
                    defaultValue={props.jobTag}
                    options={jobTag.length >=3 ? jobTag : options}
                    noOptionsMessage={()=>"You could only assign 3 tags to Job Announcement"}
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => {setJobTag(e)}}
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
                    defaultValue={props.jobDetail.company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Address</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    defaultValue={props.jobDetail.address}
                    placeholder="Address"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Province</Form.Label>
                  <Select
                    //value={province}
                    options={options}
                    defaultValue={{value: props.jobDetail.province ,label: props.jobDetail.province}}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProvince(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Minimum salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.jobDetail.lowerBoundSalary}
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
                    defaultValue={props.jobDetail.lowerBoundSalary}
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
                    defaultValue={props.jobDetail.amountRequired}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check 
                    type="checkbox" 
                    className = "form-control-lg" 
                    label="Publish"
                    defaultChecked={props.jobDetail.isPublished} 
                    onClick={()=>setPublish(!publish)}/>
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

export async function getServerSideProps(context) {
  const detail = await axios.get(`http://localhost:8000/api/job/index/${context.params.id}`);
  let tag = []
  for(let i = 0; i<detail.data.tags.length; ++i){
    tag.push({
      value : detail.data.tags[i].name,
      label: detail.data.tags[i].name
  })}
  return {
    props: {
      jobDetailId: context.params.id,
      jobDetail: detail.data,
      jobTag: tag
    }
  }
}

export default EditJobDetails;
