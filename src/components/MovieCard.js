import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
  const movie = props.movie;

  return (
    <div className='col'>
      <div className='card h-100'>
        <div className='card-body'>
          <h2 className='card-title'>
              <Link to={`/show-movie/${movie._id}`}>{movie.title}</Link>
            </h2>
            <h3>{movie.director}</h3>
            <p className='card-text'>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;