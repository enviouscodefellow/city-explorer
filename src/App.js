import React from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Weather from './Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      lat: '',
      lon: '',
      error: false,
      errorMessage: '',
      mapData: '',
      weatherData: []
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value,
    });
  };

  handleGetCity = async (event) => {
    event.preventDefault();

    try {
      let cityDataURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(cityDataURL);
      console.log(cityData);
      
      let mapDataURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=10`;

      this.getWeatherData(cityData.data[0]);

      console.log(cityData.data[0]);
      this.setState({
        cityData: cityData.data[0],
        lat: `Latitude: ${cityData.data[0].lat}`,
        lon: `Longitude: ${cityData.data[0].lon}`,
        error: false,
        mapData: mapDataURL
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }  
  };

getWeatherData = async (location) => {
  try{
    let weatherDataURL = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`

    console.log(weatherDataURL);

    let weatherData = await axios.get(weatherDataURL)

    this.setState({
      weatherData: weatherData.data
    });
  } catch (error) {
    console.log(error);
    this.setState({
      error: true,
      errorMessage: error.message,
    });
  }
}

  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.handleGetCity}>
          <label>
            {'🕵'}
            Pick a city.
            <input type="text" onInput={this.handleInput} />
            <Button style= {{backgroundColor: "paleturquoise"}} variant="outline-dark" type="submit">
              Explore!
            </Button>
          </label>
        </form>
        {this.state.error ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <>
          <Card style={{ width: 'auto' }}>
          <Card.Header>{this.state.cityData.display_name}</Card.Header>
          <Card.Img variant="top" src={this.state.mapData}/>
      <Card.Body>
        <Card.Title></Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>{this.state.lat}</ListGroup.Item>
        <ListGroup.Item>{this.state.lon}</ListGroup.Item>
        </ListGroup>
        {/* <Button variant="primary">Display Map</Button> */}
      </Card.Body>
    </Card>
            {/* <p>{this.state.cityData.display_name}</p>
            <p>{this.state.lat}</p>
            <p>{this.state.lon}</p> */}
          </>
        )}
        <Weather 
        weatherData={this.state.weatherData}
        />
      </>
    );
  }
}

export default App;
