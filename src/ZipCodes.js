import React from "react";

class ZipCodeDisplay extends React.Component {
  getZipcodes() {
    let container = [];
    for (let i = 0; i < this.props.zipcodes.length; i++) {
      container.push(
        <li key={this.props.zipcodes[i]}>{this.props.zipcodes[i]}</li>
      );
    }

    return container;
  }

  render() {
    if (this.props.zipcodes.length >= 1) {
      return (
        <div className="zip-code-container">
          <h2 className="sub-heading">All Available Zip Codes</h2>
          <ul className="zipcode-list">{this.getZipcodes()}</ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ZipCodeDisplay;
