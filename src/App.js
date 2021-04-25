import { Component } from "react";

// https://corona.lmao.ninja/docs/
const APICovid19 = "https://disease.sh/v3/covid-19/all";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    fetch(APICovid19)
      .then((res) => res.json())
      .then((res) => this.setState({ ...this.state, data: res }));
  }

  render() {
    return (
      <ul>
        {Object.keys(this.state.data).forEach(val => {
            console.log(val)
          })}
      </ul>
    );
  }
}

export default App;
