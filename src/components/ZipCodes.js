import React from "react";

class ZipCodeDisplay extends React.Component {
  getZipCodes = () => {
    let container = [];
    for (let i = 0; i < this.props.zipCodes.length; i++) {
      container.push(
        <li key={this.props.zipCodes[i]}>{this.props.zipCodes[i]}</li>
      );
    }

    return container;
  }

  render() {
    if (this.props.zipCodes.length >= 1) {
      return (
        <div className="zip-code-container">
          <h2 className="sub-heading">All Available Zip Codes</h2>
          <ul className="zipCode-list">{this.getZipCodes()}</ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ZipCodeDisplay;
