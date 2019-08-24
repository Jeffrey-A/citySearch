// Libraries
import axios from "axios";
import React from "react";
import Loader from "react-loader-spinner";

// Styles
import "./App.css";

// Components
import Form from "./components/Form";
import City from "./components/City";
import ZipCodeDisplay from "./components/ZipCodes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCodes: [],
      cities: [],
      isPending: false,
      isSubmitted: false,
      isError: false
    };

    this.citiesContainer = [];
  }

  resetState = () => {
    this.setState({
      isSubmitted: true,
      isPending: true,
      zipCodes: [],
      cities: [],
      isError: false
    });
    this.citiesContainer = [];
  };

  getZipCodes = cityName => {
    this.resetState();
    axios
      .get("http://ctp-zip-api.herokuapp.com/city/" + cityName)
      .then(response => {
        this.setState(
          {
            zipCodes: response.data,
            isError: false,
            isPending: false,
            isSubmitted: false
          },
          () => {
            this.getCities();
          }
        );
      })
      .catch(error => {
        this.setState({ isError: true, isPending: false, isSubmitted: false });
      });
  };

  getCities = () => {
    for (let i = 0; i < this.state.zipCodes.length; i++) {
      axios
        .get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCodes[i])
        .then(response => {
          this.citiesContainer = this.citiesContainer.concat(response.data);

          if (i === this.state.zipCodes.length - 1) {
            this.setState({ cities: this.citiesContainer });
          }
        })
        .catch(error => {
          this.setState({
            isError: true,
            isPending: false,
            isSubmitted: false
          });
        });
    }
  };

  createCities = () => {
    let container = [];

    for (let i = 0; i < this.state.cities.length; i++) {
      let oneCity = this.state.cities[i];
      container.push(
        <City
          key={oneCity.RecordNumber}
          zipCode={oneCity.Zipcode}
          city={oneCity.City}
          cState={oneCity.State}
          location={oneCity.Location}
          population={oneCity.EstimatedPopulation}
          wages={oneCity.TotalWages}
        />
      );
    }
    return container;
  };

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
        <Form getZipCodes={this.getZipCodes} />
        {loader}
        <ZipCodeDisplay zipCodes={this.state.zipCodes} />

        {this.state.cities.length ? (
          <h2 className="sub-heading">Zip Codes Info</h2>
        ) : null}
        <div className="cities-container">{this.createCities()}</div>
      </div>
    );
  }
}

export default App;
