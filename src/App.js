import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Container, Row, Col, Table, Form, Card, Tabs, Tab } from "react-bootstrap";
import "./App.css";

// Get COVID-19 totals for all countries
// data/disease.sh_v3_covid-19_countries.json
const APICovid19Countries = "https://disease.sh/v3/covid-19/countries";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [activeCountry, setActiveCountry] = useState([]);

  useEffect(() => {
    axios.get(APICovid19Countries).then(res => setCountriesData(res.data));
  }, []);

  const handleChange = e => {
    setActiveCountry(countriesData.filter(i => e.target.value === i.country));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Choose country</Form.Label>
              <Form.Control onChange={handleChange} as="select">
                <option>All country</option>
                {countriesData.map((el) => {
                  let country = el.countryInfo._id ? (
                    <option key={el.countryInfo._id}>{el.country}</option>
                  ) : null;
                  return country;
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      { activeCountry.length > 0 && (
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  {activeCountry[0].country} - {activeCountry[0].continent}
                </Card.Title>
              </Card.Header>
              <Card.Img src={activeCountry[0].countryInfo.flag} />
              <Card.Body>
                <Tabs
                  style={{ margin: "auto" }}
                  defaultActiveKey="general"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="general" title="General information">
                    <Table className="mt-1" striped hover>
                      <thead>
                        <tr>
                          <th>Cases</th>
                          <th>Deaths</th>
                          <th>Recovered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activeCountry[0].cases}</td>
                          <td>{activeCountry[0].deaths}</td>
                          <td>{activeCountry[0].recovered}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="today" title="Today information">
                    <Table className="mt-1" striped hover>
                      <thead>
                        <tr>
                          <th>Cases</th>
                          <th>Deaths</th>
                          <th>Recovered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activeCountry[0].todayCases}</td>
                          <td>{activeCountry[0].todayDeaths}</td>
                          <td>{activeCountry[0].todayRecovered}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="perOneMillion" title="Per One Million">
                    <Table className="mt-1" striped hover>
                      <thead>
                        <tr>
                          <th>Cases</th>
                          <th>Deaths</th>
                          <th>Recovered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{activeCountry[0].casesPerOneMillion}</td>
                          <td>{activeCountry[0].deathsPerOneMillion}</td>
                          <td>{activeCountry[0].recoveredPerOneMillion}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </Card.Body>
              <Card.Footer className="text-muted">
                Updated{" "}
                {formatDistanceToNow(activeCountry[0].updated, {
                  addSuffix: true,
                })}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
