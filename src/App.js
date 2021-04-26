import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "holderjs";
import "./App.css";

// Get global COVID-19 totals for today, yesterday and two days ago
const APICovid19All = "https://disease.sh/v3/covid-19/all";

function App() {
  // Default updated new Date().getTime() - 1619467607934
  const [allData, setAllData] = useState({ updated: new Date().getTime() });

  useEffect(() => {
    axios(APICovid19All).then((res) => setAllData(res.data));
  }, []);

  let allDataKeys = Object.keys(allData).sort();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                {allDataKeys &&
                  allDataKeys.map((el, i) => {
                    return <th key={i}>{el}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {allDataKeys &&
                  allDataKeys.map((el, i) => {
                    if (el === "updated") {
                      var qwerty = formatDistanceToNow(new Date(allData[el]), {
                        addSuffix: true,
                      });
                    }
                    return <td key={i}>{qwerty ? qwerty : allData[el]}</td>;
                  })}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
