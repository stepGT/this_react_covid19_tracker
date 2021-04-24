import { Component } from "react";

const APICovid19 = "https://api.covid19api.com/summary";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch(APICovid19)
      .then((res) => res.json())
      .then((res) => this.setState({ ...this.state, data: res.Countries }));
  }

  render() {
    return (
      <ul>
        {this.state.data &&
          this.state.data.map((el) => {
            return <li key={el.ID}>{el.Country}</li>;
          })}
      </ul>
    );
  }
}

export default App;
