import React from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import City from "./components/City";
import ZipCodeDisplay from "./components/ZipCodes";
import Loader from "react-loader-spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      zipcodes: "",
      cities: "",
      isPending: false,
      isSubmitted: false,
      isError: false
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
    this.setState({
      isSubmitted: true,
      isPending: true,
      zipcodes: "",
      cities: "",
      isError: false
    });
    this.info = [];
    let cityName = this.state.value.toUpperCase();

    axios
      .get("http://ctp-zip-api.herokuapp.com/city/" + cityName)
      .then(response => {
        let zipcodes = response.data;
        this.setState({ zipcodes: zipcodes, value: "", isError: false, isPending: false, isSubmitted: false });
        this.getCities();
      })
      .catch(error => {
        this.setState({ isError: true, isPending: false, isSubmitted: false });
      });
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
          this.info = this.info.concat(response.data);
          this.setStateForCities();
        })
        .catch(error => {
          this.setState({
            isError: true,
            isPending: false,
            isSubmitted: false
          });
        });
    }
  }

  render() {
    const { isPending, isSubmitted, isError } = this.state;
    let loader;
    if (isError) {
      loader = (
        <h2 className="center">
          Sorry, an error has ocurred or the city was not found.
        </h2>
      );
    }
    if (isPending && isSubmitted) {
      loader = (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loader type="ThreeDots" color="#000000" height="100" width="100" />
        </div>
      );
    }
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
        {loader}
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
