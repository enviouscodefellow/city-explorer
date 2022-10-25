import React from 'react';
import axios from 'axios';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''

    }
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value
    })
  }


  handleGetCity = async (event) => {
    event.preventDefault();

    try{
      let cityDataURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(cityDataURL);
  
      console.log(cityData.data[0]);
      this.setState({
        cityData: cityData.data[0],
        error: false
      });
          } catch(error){
            console.log(error);
            this.setState({
              error: true,
              errorMessage: error.message
            })
          }
  }

  
render () {
  return (
    <>
    <h1>API Call</h1>

    <form onSubmit={this.handleGetCity}>
    <label> Pick a city.
      <input type="text" onInput={this.handleInput}/>
      <button type='submit'>Let's go!</button>
    </label>
    </form>
    {this.state.error
    ?
  <p>{this.state.errorMessage}</p>
  :
  <p>{this.state.cityData.display_name}</p>
    }
    </>
  );
}
}

export default App;
