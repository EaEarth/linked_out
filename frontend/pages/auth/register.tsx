import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, InputGroup, Row, Form, FormGroup } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Link from 'next/link';
import axios from 'axios';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';



export const Register = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    tags: [],
    province: "",
    successMessage: null
  })

  const [required, setRequired] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    birthDate: '',
    password: '',
    province: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectMultiChange = (e) => {
    let tempTags = [];
    for (let i=0;i<e.length;i++){
      tempTags.push(e[i]['value']);
    }
    setState((prevState) => ({...prevState,tags: tempTags}));
    console.log(state)
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    let allInfo = true;
    if (!state.username.length) {
      setRequired((prevRequired) => ({ ...prevRequired, username: "*required" }));
      allInfo = false;
      console.log(required)
    } else setRequired((prevRequired) => ({ ...prevRequired, username: "" }));

    if (!state.firstname.length) {
      setRequired((prevRequired) => ({ ...prevRequired, firstname: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, firstname: "" }));

    if (!state.lastname.length) {
      setRequired((prevRequired) => ({ ...prevRequired, lastname: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, lastname: "" }));

    if (!state.address.length) {
      setRequired((prevRequired) => ({ ...prevRequired, address: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, address: "" }));

    if (!state.email.length) {
      setRequired((prevRequired) => ({ ...prevRequired, email: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, email: "" }));

    if (!state.birthDate.length) {
      setRequired((prevRequired) => ({ ...prevRequired, birthDate: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, birthDate: "" }));

    if (!state.password.length) {
      setRequired((prevRequired) => ({ ...prevRequired, password: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, password: "" }));

    if (!state.confirmPassword.length) {
      setRequired((prevRequired) => ({ ...prevRequired, confirmPassword: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, confirmPassword: "" }));

    if (!state.phone.length) {
      setRequired((prevRequired) => ({ ...prevRequired, phone: "*required" }));
      allInfo = false;
    } else setRequired((prevRequired) => ({ ...prevRequired, phone: "" }));

    if (!state.province) {
      setRequired(({...required, province:"*required"}))
    } else setRequired(({...required, province:""}))

    if (state.password === state.confirmPassword) {
      if (allInfo) sendDetailsToServer();
    } else {
      setRequired((prevRequired) => ({ ...prevRequired, confirmPassword: "Password not match" }));
    }
  };


  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      const payload = {
        username: state.username,
        password: state.password,
        email: state.email,
        prefix: 'Mr.',
        firstname: state.firstname,
        lastname: state.lastname,
        birthDate: state.birthDate,
        address: state.address,
        latitude: 12,
        longtitude: 13,
        telNumber: state.phone,
        province: state.province,
        tags: state.tags
      };
      axios
        .post('http://localhost:8000/api/users', payload)
        .then(function (response) {
          if (response.status === 201) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                'Registration successful. Redirecting to home page..',
            }));
            window.location.href = '/auth/successfulRegister';
          } else {
            console.log('some error occur');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('Please enter valid username and password');
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title>Register</title>
      </Head>

      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={{ span: 5 }} className="d-flex flex-column">
            <Form>
              <Form.Group className="">
                <i className="bi bi-person-fill"></i>
                <Form.Control
                  type="text"
                  id="username"
                  value={state.username}
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
                <p style={{ color: 'red' }}>{required.username}</p>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="firstname"
                  value={state.firstname}
                  placeholder="Firstname"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.firstname}</p>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="lastname"
                  value={state.lastname}
                  placeholder="Lastname"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.lastname}</p>
              </Form.Group>

              <Form.Group>
                <i className="bi bi-envelope-fill"></i>
                <Form.Control
                  type="email"
                  id="email"
                  value={state.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.email}</p>
              </Form.Group>

              <Form.Group>
                <i className="bi bi-geo-alt-fill"></i>
                <Form.Control
                  type="text"
                  id="address"
                  value={state.address}
                  placeholder="Address"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.address}</p>
              </Form.Group>

              <Form.Group>
                <i className="bi bi-telephone-fill"></i>
                {/* {
                  <PhoneInput
                    country={'th'}
                    placeholder="Phone Number"
                    onChange={(value) => setPhoneNumber(value)}
                  />
                } */}
                <Form.Control
                  type="text"
                  id="phone"
                  value={state.phone}
                  placeholder="Phone"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.phone}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  id="birthDate"
                  value={state.birthDate}
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.birthDate}</p>
              </Form.Group>

              <Form.Group>
                  <Form.Label>Job Tag</Form.Label>
                  <Select
                    name="colors"
                    options={state.tags.length >= 3 ? [] : props.allTags}
                    noOptionsMessage={() =>
                      'You could only assign 3 tags to your profile'
                    }
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={handleSelectMultiChange}
                    isMulti
                  />
                </Form.Group>
                
                <label>Province</label>
                <Select
                  options={provinceList}
                  name="province"
                  isSearchable="true"
                  maxMenuHeight={200}
                  className="basic-select mb-3"
                  classNamePrefix="select"
                  onChange={(e) => {
                    setState({...state,province: e.value})
                  }}
                />
                <p style={{ color: 'red' }}>{required.province}</p>

              <Form.Group>
                <i className="bi bi-key-fill"></i>
                <Form.Control
                  type="password"
                  id="password"
                  value={state.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.password}</p>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  value={state.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                <p style={{ color: 'red' }}>{required.confirmPassword}</p>
              </Form.Group>
              <Row className="d-flex justify-content-center">
                <Link href="/test">
                  <button
                    type="button"
                    className="my-2 btn btn-primary"
                    onClick={handleSubmitClick}>
                    Register
                </button>
                </Link>
              </Row>
              <Row className="justify-content-center">
                <span>Already have an account?</span>
                <Link href="/auth/login">
                  <a className="ml-2">Login</a>
                </Link>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  const tagapi = await axios.get('http://localhost:8000/api/job/tag/index');
  let allTags = []
  for (const tag of tagapi.data) {
    allTags.push({ value: tag.name, label: tag.name });
  }
  return {
    props:{
      allTags: allTags
    }
  }
}

const provinceList = [{ 'label': 'นครราชสีมา', 'value': 'นครราชสีมา' }, { 'label': 'เชียงใหม่', 'value': 'เชียงใหม่' }, { 'label': 'กาญจนบุรี', 'value': 'กาญจนบุรี' }, { 'label': 'ตาก', 'value': 'ตาก' }, { 'label': 'อุบลราชธานี', 'value': 'อุบลราชธานี' }, { 'label': 'สุราษฎร์ธานี', 'value': 'สุราษฎร์ธานี' }, { 'label': 'ชัยภูมิ', 'value': 'ชัยภูมิ' }, { 'label': 'แม่ฮ่องสอน', 'value': 'แม่ฮ่องสอน' }, { 'label': 'เพชรบูรณ์', 'value': 'เพชรบูรณ์' }, { 'label': 'ลำปาง', 'value': 'ลำปาง' }, { 'label': 'อุดรธานี', 'value': 'อุดรธานี' }, { 'label': 'เชียงราย', 'value': 'เชียงราย' }, { 'label': 'น่าน', 'value': 'น่าน' }, { 'label': 'เลย', 'value': 'เลย' }, { 'label': 'ขอนแก่น', 'value': 'ขอนแก่น' }, { 'label': 'พิษณุโลก', 'value': 'พิษณุโลก' }, { 'label': 'บุรีรัมย์', 'value': 'บุรีรัมย์' }, { 'label': 'นครศรีธรรมราช', 'value': 'นครศรีธรรมราช' }, { 'label': 'สกลนคร', 'value': 'สกลนคร' }, { 'label': 'นครสวรรค์', 'value': 'นครสวรรค์' }, { 'label': 'ศรีสะเกษ', 'value': 'ศรีสะเกษ' }, { 'label': 'กำแพงเพชร', 'value': 'กำแพงเพชร' }, { 'label': 'ร้อยเอ็ด', 'value': 'ร้อยเอ็ด' }, { 'label': 'สุรินทร์', 'value': 'สุรินทร์' }, { 'label': 'อุตรดิตถ์', 'value': 'อุตรดิตถ์' }, { 'label': 'สงขลา', 'value': 'สงขลา' }, { 'label': 'สระแก้ว', 'value': 'สระแก้ว' }, { 'label': 'กาฬสินธุ์', 'value': 'กาฬสินธุ์' }, { 'label': 'อุทัยธานี', 'value': 'อุทัยธานี' }, { 'label': 'สุโขทัย', 'value': 'สุโขทัย' }, { 'label': 'แพร่', 'value': 'แพร่' }, { 'label': 'ประจวบคีรีขันธ์', 'value': 'ประจวบคีรีขันธ์' }, { 'label': 'จันทบุรี', 'value': 'จันทบุรี' }, { 'label': 'พะเยา', 'value': 'พะเยา' }, { 'label': 'เพชรบุรี', 'value': 'เพชรบุรี' }, { 'label': 'ลพบุรี', 'value': 'ลพบุรี' }, { 'label': 'ชุมพร', 'value': 'ชุมพร' }, { 'label': 'นครพนม', 'value': 'นครพนม' }, { 'label': 'สุพรรณบุรี', 'value': 'สุพรรณบุรี' }, { 'label': 'ฉะเชิงเทรา', 'value': 'ฉะเชิงเทรา' }, { 'label': 'มหาสารคาม', 'value': 'มหาสารคาม' }, { 'label': 'ราชบุรี', 'value': 'ราชบุรี' }, { 'label': 'ตรัง', 'value': 'ตรัง' }, { 'label': 'ปราจีนบุรี', 'value': 'ปราจีนบุรี' }, { 'label': 'กระบี่', 'value': 'กระบี่' }, { 'label': 'พิจิตร', 'value': 'พิจิตร' }, { 'label': 'ยะลา', 'value': 'ยะลา' }, { 'label': 'ลำพูน', 'value': 'ลำพูน' }, { 'label': 'นราธิวาส', 'value': 'นราธิวาส' }, { 'label': 'ชลบุรี', 'value': 'ชลบุรี' }, { 'label': 'มุกดาหาร', 'value': 'มุกดาหาร' }, { 'label': 'บึงกาฬ', 'value': 'บึงกาฬ' }, { 'label': 'พังงา', 'value': 'พังงา' }, { 'label': 'ยโสธร', 'value': 'ยโสธร' }, { 'label': 'หนองบัวลำภู', 'value': 'หนองบัวลำภู' }, { 'label': 'สระบุรี', 'value': 'สระบุรี' }, { 'label': 'ระยอง', 'value': 'ระยอง' }, { 'label': 'พัทลุง', 'value': 'พัทลุง' }, { 'label': 'ระนอง', 'value': 'ระนอง' }, { 'label': 'อำนาจเจริญ', 'value': 'อำนาจเจริญ' }, { 'label': 'หนองคาย', 'value': 'หนองคาย' }, { 'label': 'ตราด', 'value': 'ตราด' }, { 'label': 'พระนครศรีอยุธยา', 'value': 'พระนครศรีอยุธยา' }, { 'label': 'สตูล', 'value': 'สตูล' }, { 'label': 'ชัยนาท', 'value': 'ชัยนาท' }, { 'label': 'นครปฐม', 'value': 'นครปฐม' }, { 'label': 'นครนายก', 'value': 'นครนายก' }, { 'label': 'ปัตตานี', 'value': 'ปัตตานี' }, { 'label': 'กรุงเทพมหานคร', 'value': 'กรุงเทพมหานคร' }, { 'label': 'ปทุมธานี', 'value': 'ปทุมธานี' }, { 'label': 'สมุทรปราการ', 'value': 'สมุทรปราการ' }, { 'label': 'อ่างทอง', 'value': 'อ่างทอง' }, { 'label': 'สมุทรสาคร', 'value': 'สมุทรสาคร' }, { 'label': 'สิงห์บุรี', 'value': 'สิงห์บุรี' }, { 'label': 'นนทบุรี', 'value': 'นนทบุรี' }, { 'label': 'ภูเก็ต', 'value': 'ภูเก็ต' }, { 'label': 'สมุทรสงคราม', 'value': 'สมุทรสงคราม' }]

export default Register;
