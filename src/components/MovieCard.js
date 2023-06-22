import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MovieCard = (props) => {
  const movie = props.movie;

  return (
    <div className='card-container'>
      <div className='desc'>
        <h2>
          <Link to={`/show-movie/${movie._id}`}>{movie.title}</Link>
        </h2>
        <h3>{book.director}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;