import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function ShowMovieList() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/movies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowMovieList');
      });
  }, []);

  const movieList =
    movies.length === 0
      ? 'there is no movie record!'
      : movies.map((movie, k) => <MovieCard movie={movie} key={k} />);

  return (
    <div className='ShowMovieList'>
      <HelmetProvider>
      <Helmet>
        <title>Home | {window.$sitename}</title>
      </Helmet>
      </HelmetProvider>
      <div className='container'>
        <div className='row'>
          <Link to='/create-movie' className='btn'>Add movie</Link>
          <div className='list'>{movieList}</div>
        </div>
      </div>

    </div>
  );

}

export default ShowMovieList;
