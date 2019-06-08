import React from 'react';

class City extends React.Component{
    render(){
        return (
        <div className="city-info">
            <h2 className="city-header">{this.props.city + ", " +this.props.cState +" "+ this.props.zipcode}</h2>
            <ul>
                <li>State: {this.props.cState}</li>
                <li>Location: {this.props.location}</li>
                <li>Population (Stimated): {this.props.population}</li>
                <li>Total Wages: {this.props.wages}</li>
            </ul>
        </div>)
    }
}

export default City;