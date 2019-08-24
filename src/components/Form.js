import React from "react";
import Header from "./Header";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  onValueChange = event => {
    this.setState({ value: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    this.props.getZipCodes(this.state.value.toUpperCase())
  };

  render() {
    return (
      <div>
        <Header header="City Search" />
        <form className="input-getter-div" onSubmit={this.submit}>
          <label htmlFor="input-box">City Name:</label>
          <input
            onChange = {this.onValueChange}
            value={this.state.value}
            id="input-box"
            type="text"
            placeholder="Enter city name"
          />
        </form>
      </div>
    );
  }
}

export default Form;
