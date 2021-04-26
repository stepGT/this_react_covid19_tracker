import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "holderjs";
import "./App.css";

// Get global COVID-19 totals for today, yesterday and two days ago
const APICovid19All = "https://disease.sh/v3/covid-19/all";

function App() {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios(APICovid19All).then((res) => setAllData(res.data));
  }, []);

  if (allData.updated) {
    var result = formatDistanceToNow(new Date(parseInt(allData.updated)), {
      addSuffix: true,
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <CardDeck>
            <Card text="white" bg="warning" className="text-center">
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Cases</Card.Title>
                <Card.Text>{allData.cases}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-light">Last updated {result}</small>
              </Card.Footer>
            </Card>

            <Card text="white" bg="danger" className="text-center">
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Deaths</Card.Title>
                <Card.Text>{allData.deaths}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-light">Last updated {result}</small>
              </Card.Footer>
            </Card>

            <Card text="white" bg="success" className="text-center">
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Recovered</Card.Title>
                <Card.Text>{allData.recovered}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-light">Last updated {result}</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
