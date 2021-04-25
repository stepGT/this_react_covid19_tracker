import React, { useState, useEffect } from "react";
import "./App.css";

// https://corona.lmao.ninja/docs/
const APICovid19 = "https://disease.sh/v3/covid-19/all";

function App() {
  const [allData, setAllData] = useState()
  useEffect(() => {
    fetch(APICovid19)
      .then((res) => res.json())
      .then((res) => setAllData(res));
  });
}

export default App;
