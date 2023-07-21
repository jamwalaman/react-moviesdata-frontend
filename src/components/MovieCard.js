import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
  const movie = props.movie;

  return (
    <div className='card-container'>
        <h2>
          <Link to={`/show-movie/${movie._id}`}>{movie.title}</Link>
        </h2>
        <h3>{movie.director}</h3>
        <p>{movie.synopsis}</p>
    </div>
  );
};

export default MovieCard;