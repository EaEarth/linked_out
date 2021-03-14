import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Link from 'next/link';
import axios from 'axios';
import styles from './modal.module.scss';

export const ApplyModal = (props) => {
    const router = useRouter();

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            id="applyModal"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className={``}>
                <Container>
                    <Row>
                        <Col className='text-center'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="256" height="256"
                                fill="currentColor"
                                className="bi bi-check2 text-success"
                                viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                            <h1 className="text-success mb-2">Submitted Successful</h1>
                            <button type="button" className="btn btn-primary my-2 btn-lg" onClick={() => router.push('/')}>Ok</button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default ApplyModal;
