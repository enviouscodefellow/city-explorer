'use strict';

//REQUIRES

cost express = require('epress');
require (.dotenv).config();
cost cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
request.status(200).send(`Welcome to my server`);
});

app.get('/weather', async (request, response, next) => {
  try{
    //`http://localhost:3001/photos?cityName=kittens
let queryFromFrontend = request.query.cityName

let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.API_KEY_HERE}&lat=${queryFromFrontend}&lon=${queryFromFrontend}`

let weatherResults = await axios.get(url);

//TODO weatherResults.map();
console.log(weatherResults);

response.status(200).send.(weatherResults.data)

  } catch (error) {
    next(error);
  }
}

app.get('/movies', async (request, response, next) => {
  try{
    //`http://localhost:3001/movies?cityName=Seattle
let queryFromFrontend = request.query.cityName

let url = `https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false`

let movieResults = await axios.get(url);

//TODO movieResults.map();
console.log(movieResults);

response.status(200).send.(movieResults.results);

  } catch (error) {
    next(error);
  }
}

app.listen(PORT, ()=> console.log(`We are up and running on ${PORT}`));
