import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import App from './App';

class Weather extends React.Component {
  render(){
    return (
    <>
    <h2>Weather Forecast</h2>
    <ListGroup>
      {this.props.weatherData.map((day, index) => 
      <ListGroup.Item>{day.date}: {day.desc}</ListGroup.Item>
      )};
    </ListGroup>

    </>
    )
  }
}

export default Weather;