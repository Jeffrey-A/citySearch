import React from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import City from "./components/City";
import ZipCodeDisplay from "./components/ZipCodes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      zipcodes: "",
      cities: ""
    };

    this.inputValues = this.inputValues.bind(this);
    this.getZipcodes = this.getZipcodes.bind(this);
    this.getCities = this.getCities.bind(this);
    this.info = [];
  }

  inputValues(event) {
    this.setState({ value: event.target.value });
  }

  getZipcodes(e) {
    e.preventDefault();
    this.info = [];

    let cityName = this.state.value.toUpperCase();

    axios
      .get("http://ctp-zip-api.herokuapp.com/city/" + cityName)
      .then(response => {
        let zipcodes = response.data;
        this.setState({ zipcodes: zipcodes, value: "" });
        this.getCities();
      })
      .catch(error => {});
  }

  createCities() {
    let container = [];
    for (let i = 0; i < this.state.cities.length; i++) {
      let oneCity = this.state.cities[i];
      container.push(
        <City
          key={oneCity.RecordNumber}
          zipcode={oneCity.Zipcode}
          city={oneCity.City}
          cState={oneCity.State}
          location={oneCity.Location}
          population={oneCity.EstimatedPopulation}
          wages={oneCity.TotalWages}
        />
      );
    }
    return container;
  }

  setStateForCities() {
    this.info.sort();
    this.setState({ cities: this.info });
  }

  getCities() {
    for (let i = 0; i < this.state.zipcodes.length; i++) {
      axios
        .get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipcodes[i])
        .then(response => {
          //console.log(response.data);
          this.info = this.info.concat(response.data);
          this.setStateForCities();
        })
        .catch(error => {});
    }
  }

  render() {
    return (
      <div>
        <Header header="City Search" />

        <form className="input-getter-div" onSubmit={this.getZipcodes}>
          <label htmlFor="input-box">City Name:</label>
          <input
            id="input-box"
            type="text"
            onChange={this.inputValues}
            value={this.state.value}
            placeholder="Enter city name"
          />
        </form>

        <ZipCodeDisplay zipcodes={this.state.zipcodes} />

        {this.state.cities.length ? (
          <h2 className="sub-heading">Zip Codes Info</h2>
        ) : null}
        <div className="cities-container">{this.createCities()}</div>
      </div>
    );
  }
}

export default App;
