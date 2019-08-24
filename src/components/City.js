import React from "react";

const City = (props) => {
  return (
    <div className="city-info">
      <h2 className="city-header">
        {props.city + ", " + props.cState + " " + props.zipCode}
      </h2>
      <ul>
        <li>State: {props.cState}</li>
        <li>Location: {props.location}</li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
  );
};

export default City;
