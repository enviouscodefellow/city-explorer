import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import App from './App';

let movieBaseURL = 'https://image.tmdb.org/t/p/w200';

class Movies extends React.Component {
  render(){
    return (
    <>
    <h2>Movies</h2>
    <ListGroup>
      {this.props.movieData.map((movie, index) => 
      <ListGroup.Item id='moviesList'>
        {movie.title}: 
        {movie.release}
        <img src={movieBaseURL + movie.poster} className='img-thumbnail' alt={movie.title}/> 
        {movie.overview}
        </ListGroup.Item>
      )}
    </ListGroup>

    </>
    )
  }
}

export default Movies;