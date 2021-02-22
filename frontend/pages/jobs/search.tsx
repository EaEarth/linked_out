import Head from 'next/head';
import React,{useState, useEffect} from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Select from 'react-select';

export const Jobs = () => {
    const [ position, setPosition ] = useState("")
    const [ jobTypes, setJobTypes ] = useState<Array<String>>([])
    const [ wage, setWage ] = useState(null)

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'cookie', label: 'Cookies'},
      { value: 'trash', label: 'Trash'}
    ]
    
  return (
    <DefaultLayout>
      <Head>
        <title>BrowseJob - LinkedOut</title>
      </Head>
      <Container>
        <Row>
          <Col md="4">
          <h1>Browse Job</h1>
          <form>
            <label>
            Position:
            </label>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
          </form>

          <form>
            <label>
            Job Type:
            </label>
            <Select
              isMulti
              value={jobTypes}
              name="colors"
              options={
                jobTypes.length >=3 ? jobTypes : options
              }
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={ (e) => setJobTypes(e)}
            />
          </form>

    
          <form>
            <label>
            Wage:
            </label>
            <input type="number" value={wage} onChange={(e) => {setWage(e.target.value);} } />
            
           
          </form>
          </Col>
         </Row>
        </Container>
    </DefaultLayout>
  );
};

export default Jobs;