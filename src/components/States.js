import React from "react";

class State extends React.Component {
  getStates() {
    let container = [];

    for (let i = 0; i < this.props.states.length; i++) {
      container.push(<li>{this.props.states[i]}</li>);
    }

    return container;
  }

  render() {
    if (this.props.states.length) {
      return (
        <div>
          <h2 className="sub-heading">States This City is Found</h2>
          <ul className="zipcode-list">{this.getStates()}</ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default State;
