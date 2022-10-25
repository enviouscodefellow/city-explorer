import React from 'react';
import Axios from 'axios';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],

    }
  }

  handleGetCity = (event) => {
    event.preventDefault();
    let cityData = axios.get('https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json')
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({
      city: event.target.value
    })
  }

  getCityData = (event) => {
    event.preventDefault();
  }

}

render() {
  return (
    <>
    <h1>API Call</h1>

    <form>
      <button onClick={this.handleGetCity}>Click Me!</button>
    </form>
    </>
  )
}

export default App;
