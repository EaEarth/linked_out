import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Link from 'next/link';
import axios from 'axios';
import styles from './modal.module.scss';

export const BrowseModal = (props) => {
  const [search, setSearch] = useState('');
  const [jobTypes, setJobTypes] = useState([]);
  const [province, setProvince] = useState('');
  const [wage, setWage] = useState('');
  const [tags, setTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/job/tag/index')
      .then(function (response) {
        if (response.status === 200) {
          let tags = response.data;
          const tempTags = [];
          for (const tag of tags) {
            tempTags.push({ value: tag.name, label: tag.name });
          }
          setTags(tempTags);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.show]);

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

  const handleSubmitClick = (e) => {
    e.preventDefault();

    let hasTag = '';
    let tempTag = [];
    if (jobTypes.length > 0) {
      for (const tag of jobTypes) {
        tempTag.push(tag.value);
      }
      hasTag = `&tags=${tempTag}`;
    }

    const hasProvince = province == '' ? '' : `&province=${province}`;
    const hasSearch = search == '' ? '' : `&search=${search}`;
    const hasSalary =
      wage == '' || wage == '0' ? '' : `&lowerBoundSalary=${wage}`;
    router.push(
      `/jobs?browse=true${hasSearch}${hasTag}${hasSalary}${hasProvince}`
    );
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      id="browseModal"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header
        closeButton
        className={`show-grid ${styles['browse-body']}`}>
        <Modal.Title className={`${styles['browse-title']}`}>
          Browse Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`show-grid ${styles['browse-body']}`}>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Title & Company :
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formProvince">
                  <Form.Label className={styles.label}>province</Form.Label>
                  <Select
                    value={{ value: province, label: province }}
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setProvince(e.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className={styles.label}>Tags :</Form.Label>
                  <Select
                    isMulti
                    value={jobTypes}
                    options={jobTypes.length >= 3 ? jobTypes : tags}
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => setJobTypes(e)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className={styles.label}>Wage :</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setWage(e.target.value);
                    }}
                  />
                </Form.Group>

                <Link href="/test">
                  <img
                    role="button"
                    src="/images/search.svg"
                    width="64px"
                    height="64px"
                    className="my-2 stretched-link mx-auto d-block"
                    onClick={handleSubmitClick}
                  />
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default BrowseModal;
