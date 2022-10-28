import React from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/Image";
import Weather from './Weather.js';
import Movies from './Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      lat: '',
      lon: '',
      weatherError: false,
      weatherErrorMessage: '',
      movieError: false,
      movieErrorMessage: '',
      mapData: '',
      weatherData: [],
      movieData: [],
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
      let cityObj = cityData.data[0];
      console.log(cityObj);

      let mapDataURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityObj.lat},${cityObj.lon}&zoom=10`;

      this.setState({
        cityData: cityObj,
        lat: `Latitude: ${cityObj.lat}`,
        lon: `Longitude: ${cityObj.lon}`,
        weatherError: false,
        mapData: mapDataURL,
      });

      //API calls
      this.getWeatherData(cityObj);
      this.getMovieData();

    } catch (error) {
      console.log(error);
      this.setState({
        weatherError: true,
        weatherErrorMessage: error.message,
      });
    }
  };

  getWeatherData = async (location) => {
    try {
      // let weatherDataServer = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`

      let weatherDataServer = `${process.env.REACT_APP_SERVER}/weather?lat=${location.lat}&lon=${location.lon}`;

      console.log(weatherDataServer);

      let weatherData = await axios.get(weatherDataServer);

      this.setState({
        weatherData: weatherData.data,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  getMovieData = async () => {
    try {
      // let movieDataServer = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEBIT_API_KEY}&language=en-US&page=1&include_adult=false`

      let movieDataServer = `${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.city}`;

      console.log(movieDataServer);

      let movieData = await axios.get(movieDataServer);

      this.setState({
        movieData: movieData.data,
      });

console.log(movieData);

    } catch (error) {
      console.log(error);
      this.setState({
        movieError: true,
        movieErrorMessage: error.message,
      });
    }
  };

  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.handleGetCity}>
          <label>
            {'🕵'}
            Pick a city.
            <input type="text" onInput={this.handleInput} />
            <Button
              style={{ backgroundColor: 'paleturquoise' }}
              variant="outline-dark"
              type="submit"
            >
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
              <Card.Img variant="top" src={this.state.mapData} />
              <Card.Body>
                <Card.Title></Card.Title>
                {/* <ListGroup variant="flush">
                  <ListGroup.Item>{this.state.lat}</ListGroup.Item>
                  <ListGroup.Item>{this.state.lon}</ListGroup.Item>
                </ListGroup> */}
                {/* <Button variant="primary">Display Map</Button> */}
              </Card.Body>
            </Card>
            {/* <p>{this.state.cityData.display_name}</p>
            <p>{this.state.lat}</p>
            <p>{this.state.lon}</p> */}
          </>
        )}
        <Weather weatherData={this.state.weatherData} />
        <Movies movieData={this.state.movieData} />
      </>
    );
  }
}

export default App;
