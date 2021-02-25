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
  const jobId = props.jobDetailId;
  const [title, setTitle] = useState(props.jobDetail.title);
  const [description, setDescription] = useState(props.jobDetail.description);
  const [jobTag, setJobTag] = useState(props.jobTag);
  const [company, setCompany] = useState(props.jobDetail.company);
  const [location, setLocation] = useState(props.jobDetail.address);
  const [publish, setPublish] = useState(props.jobDetail.isPublished);
  const [minWage, setMinWage] = useState(
    props.jobDetail.lowerBoundSalary.toString()
  );
  const [maxWage, setMaxWage] = useState(
    props.jobDetail.upperBoundSalary.toString()
  );
  const [amount, setAmount] = useState(
    props.jobDetail.amountRequired.toString()
  );
  const [province, setProvince] = useState(props.jobDetail.province);
  const [successMessage, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(props.jobDetail.picture.path);
  const inputFile = useRef(null);
  const [tagOption, setTagOption] = useState(props.tagOption);

  const [required, setRequired] = useState({
    title: '',
    description: '',
    tag: '',
    company: '',
    address: '',
    province: '',
    minSalary: '',
    maxSalary: '',
    amount: '',
  });

  const options = [
    { label: 'นครราชสีมา', value: 'นครราชสีมา' },
    { label: 'เชียงใหม่', value: 'เชียงใหม่' },
    { label: 'กาญจนบุรี', value: 'กาญจนบุรี' },
    { label: 'ตาก', value: 'ตาก' },
    { label: 'อุบลราชธานี', value: 'อุบลราชธานี' },
    { label: 'สุราษฎร์ธานี', value: 'สุราษฎร์ธานี' },
    { label: 'ชัยภูมิ', value: 'ชัยภูมิ' },
    { label: 'แม่ฮ่องสอน', value: 'แม่ฮ่องสอน' },
    { label: 'เพชรบูรณ์', value: 'เพชรบูรณ์' },
    { label: 'ลำปาง', value: 'ลำปาง' },
    { label: 'อุดรธานี', value: 'อุดรธานี' },
    { label: 'เชียงราย', value: 'เชียงราย' },
    { label: 'น่าน', value: 'น่าน' },
    { label: 'เลย', value: 'เลย' },
    { label: 'ขอนแก่น', value: 'ขอนแก่น' },
    { label: 'พิษณุโลก', value: 'พิษณุโลก' },
    { label: 'บุรีรัมย์', value: 'บุรีรัมย์' },
    { label: 'นครศรีธรรมราช', value: 'นครศรีธรรมราช' },
    { label: 'สกลนคร', value: 'สกลนคร' },
    { label: 'นครสวรรค์', value: 'นครสวรรค์' },
    { label: 'ศรีสะเกษ', value: 'ศรีสะเกษ' },
    { label: 'กำแพงเพชร', value: 'กำแพงเพชร' },
    { label: 'ร้อยเอ็ด', value: 'ร้อยเอ็ด' },
    { label: 'สุรินทร์', value: 'สุรินทร์' },
    { label: 'อุตรดิตถ์', value: 'อุตรดิตถ์' },
    { label: 'สงขลา', value: 'สงขลา' },
    { label: 'สระแก้ว', value: 'สระแก้ว' },
    { label: 'กาฬสินธุ์', value: 'กาฬสินธุ์' },
    { label: 'อุทัยธานี', value: 'อุทัยธานี' },
    { label: 'สุโขทัย', value: 'สุโขทัย' },
    { label: 'แพร่', value: 'แพร่' },
    { label: 'ประจวบคีรีขันธ์', value: 'ประจวบคีรีขันธ์' },
    { label: 'จันทบุรี', value: 'จันทบุรี' },
    { label: 'พะเยา', value: 'พะเยา' },
    { label: 'เพชรบุรี', value: 'เพชรบุรี' },
    { label: 'ลพบุรี', value: 'ลพบุรี' },
    { label: 'ชุมพร', value: 'ชุมพร' },
    { label: 'นครพนม', value: 'นครพนม' },
    { label: 'สุพรรณบุรี', value: 'สุพรรณบุรี' },
    { label: 'ฉะเชิงเทรา', value: 'ฉะเชิงเทรา' },
    { label: 'มหาสารคาม', value: 'มหาสารคาม' },
    { label: 'ราชบุรี', value: 'ราชบุรี' },
    { label: 'ตรัง', value: 'ตรัง' },
    { label: 'ปราจีนบุรี', value: 'ปราจีนบุรี' },
    { label: 'กระบี่', value: 'กระบี่' },
    { label: 'พิจิตร', value: 'พิจิตร' },
    { label: 'ยะลา', value: 'ยะลา' },
    { label: 'ลำพูน', value: 'ลำพูน' },
    { label: 'นราธิวาส', value: 'นราธิวาส' },
    { label: 'ชลบุรี', value: 'ชลบุรี' },
    { label: 'มุกดาหาร', value: 'มุกดาหาร' },
    { label: 'บึงกาฬ', value: 'บึงกาฬ' },
    { label: 'พังงา', value: 'พังงา' },
    { label: 'ยโสธร', value: 'ยโสธร' },
    { label: 'หนองบัวลำภู', value: 'หนองบัวลำภู' },
    { label: 'สระบุรี', value: 'สระบุรี' },
    { label: 'ระยอง', value: 'ระยอง' },
    { label: 'พัทลุง', value: 'พัทลุง' },
    { label: 'ระนอง', value: 'ระนอง' },
    { label: 'อำนาจเจริญ', value: 'อำนาจเจริญ' },
    { label: 'หนองคาย', value: 'หนองคาย' },
    { label: 'ตราด', value: 'ตราด' },
    { label: 'พระนครศรีอยุธยา', value: 'พระนครศรีอยุธยา' },
    { label: 'สตูล', value: 'สตูล' },
    { label: 'ชัยนาท', value: 'ชัยนาท' },
    { label: 'นครปฐม', value: 'นครปฐม' },
    { label: 'นครนายก', value: 'นครนายก' },
    { label: 'ปัตตานี', value: 'ปัตตานี' },
    { label: 'กรุงเทพมหานคร', value: 'กรุงเทพมหานคร' },
    { label: 'ปทุมธานี', value: 'ปทุมธานี' },
    { label: 'สมุทรปราการ', value: 'สมุทรปราการ' },
    { label: 'อ่างทอง', value: 'อ่างทอง' },
    { label: 'สมุทรสาคร', value: 'สมุทรสาคร' },
    { label: 'สิงห์บุรี', value: 'สิงห์บุรี' },
    { label: 'นนทบุรี', value: 'นนทบุรี' },
    { label: 'ภูเก็ต', value: 'ภูเก็ต' },
    { label: 'สมุทรสงคราม', value: 'สมุทรสงคราม' },
  ];

  const choices = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const handleFileUpload = (e) => {
    const files = e.target.files;
    // console.log(files)
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split('.');
      const fileType = parts[parts.length - 1];
      // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setFileURL(URL.createObjectURL(e.target.files[0]));

      setFile(e.target.files[0]);
    }
  };

  const onFileButtonClick = () => {
    inputFile.current.click();
  };

  let tagArr = [];

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    let allInfo = true;
    if (title === null || !title.length) {
      setRequired((prevRequired) => ({ ...prevRequired, title: '*required' }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, title: '' }));
    }
    if (description === null || !description.length) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        description: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, description: '' }));
    }
    if (!jobTag.length) {
      setRequired((prevRequired) => ({ ...prevRequired, tag: '*required' }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, tag: '' }));
    }
    if (location === null || !location.length) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        address: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, address: '' }));
    }
    if (company === null || !company.length) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        company: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, company: '' }));
    }
    if (maxWage === null || !maxWage.length) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        maxSalary: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, maxSalary: '' }));
    }
    if (minWage === null || !minWage.length) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        minSalary: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, minSalary: '' }));
    }
    if (province === null) {
      setRequired((prevRequired) => ({
        ...prevRequired,
        province: '*required',
      }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, province: '' }));
    }
    if (amount === null || !amount.length) {
      setRequired((prevRequired) => ({ ...prevRequired, amount: '*required' }));
      allInfo = false;
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, amount: '' }));
    }
    if (!allInfo) return;
    let fileEntity = null;
    if (file !== null) {
      let formData = new FormData();
      formData.append('file', file, file.name);
      fileEntity = await axios.post(
        'http://localhost:8000/api/files/upload',
        formData
      );
    }
    for (let i = 0; i < jobTag.length; ++i) {
      tagArr.push(jobTag[i]['value']);
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
    axios
      .patch(`http://localhost:8000/api/job/${jobId}`, payload)
      .then(function (response) {
        if (response.status == 200) {
          setMessage('Update successful. Redirecting to job page..');
          router.push('/jobs/list');
        } else {
          console.log('There is an Error');
        }
      });
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Edit Job Detail</title>
      </Head>

      <Container className="my-4">
        <Row>
          <Col
            md={6}
            style={{
              width: '50%',
              paddingRight: 50,
            }}>
            <Row>
              <Image
                src={fileURL == null ? '/images/user/User.svg' : fileURL}
                height="150"
                className="d-block w-30 mx-auto"
                rounded
              />
            </Row>
            <Row className="d-flex justify-content-center my-2">
              <input
                style={{ display: 'none' }}
                // accept=".zip,.rar"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
              />
              <button
                type="button"
                className="my-2 btn btn-primary"
                onClick={onFileButtonClick}>
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
                    defaultValue={props.jobDetail.title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{required.title}</p>
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
                  <p style={{ color: 'red' }}>{required.description}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Job Tag</Form.Label>
                  <Select
                    //value={jobTag}
                    name="colors"
                    defaultValue={props.jobTag}
                    options={jobTag.length >= 3 ? jobTag : tagOption}
                    noOptionsMessage={() =>
                      'You could only assign 3 tags to Job Announcement'
                    }
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => {
                      setJobTag(e);
                    }}
                    isMulti
                  />
                  <p style={{ color: 'red' }}>{required.tag}</p>
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
                  <p style={{ color: 'red' }}>{required.company}</p>
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
                  <p style={{ color: 'red' }}>{required.address}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Province</Form.Label>
                  <Select
                    //value={province}
                    options={options}
                    defaultValue={{
                      value: props.jobDetail.province,
                      label: props.jobDetail.province,
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProvince(e)}
                  />
                  <p style={{ color: 'red' }}>{required.province}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Minimum salary per month
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.jobDetail.lowerBoundSalary}
                    placeholder="Minimum salary"
                    onChange={(e) => {
                      setMinWage(e.target.value);
                    }}
                  />
                  <p style={{ color: 'red' }}>{required.minSalary}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Maximum salary per month
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.jobDetail.lowerBoundSalary}
                    placeholder="Maximum salary"
                    onChange={(e) => {
                      setMaxWage(e.target.value);
                    }}
                  />
                  <p style={{ color: 'red' }}>{required.maxSalary}</p>
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
                  <p style={{ color: 'red' }}>{required.amount}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    className="form-control-lg"
                    label="Publish"
                    defaultChecked={props.jobDetail.isPublished}
                    onClick={() => setPublish(!publish)}
                  />
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={6}>
            <button
              type="button"
              className="my-2 btn btn-primary btn-lg float-right"
              onClick={handleSubmitClick}>
              Save
            </button>
          </Col>
          <Col md={6}>
            <button
              type="button"
              className="my-2 btn btn-primary btn-lg float-left"
              onClick={() => router.push('/jobs/list')}>
              Cancel
            </button>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  const detail = await axios.get(
    `http://localhost:8000/api/job/index/${context.params.id}`
  );
  const tagapi = await axios.get('http://localhost:8000/api/job/tag/index');
  let tag = [];
  let tags = tagapi.data;
  const tempTags = [];
  for (const tag of tags) {
    tempTags.push({ value: tag.name, label: tag.name });
  }
  for (let i = 0; i < detail.data.tags.length; ++i) {
    tag.push({
      value: detail.data.tags[i].name,
      label: detail.data.tags[i].name,
    });
  }
  return {
    props: {
      jobDetailId: context.params.id,
      jobDetail: detail.data,
      jobTag: tag,
      tagOption: tempTags,
    },
  };
}

export default EditJobDetails;
