import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "holderjs";
import "./App.css";

// Get global COVID-19 totals for today, yesterday and two days ago
// data/disease.sh_v3_covid-19_all.json
const APICovid19All = "https://disease.sh/v3/covid-19/all";

// Get COVID-19 totals for all countries
// data/disease.sh_v3_covid-19_countries.json
const APICovid19Countries = "https://disease.sh/v3/covid-19/countries";

function App() {
  // Default updated new Date().getTime() - 1619467607934
  const [allData, setAllData] = useState({});
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(APICovid19All),
      axios.get(APICovid19Countries)
    ]).then((res) => {
      setAllData(res[0].data);
      setCountriesData(res[1].data);
    });
  }, []);

  let allDataKeys = Object.keys(allData).sort();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Choose country</Form.Label>
              <Form.Control as="select">
                {countriesData.map((el, i) => (
                  <option key={i}>{el.country}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Worldometers</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { allDataKeys.map((el, i) => {
                  if (el === "updated") {
                    var qwerty = formatDistanceToNow(new Date(allData[el]), {
                      addSuffix: true,
                    });
                  }
                  return (
                    <tr key={i}>
                      <td>{el}</td>
                      <td>{qwerty ? qwerty : allData[el]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
