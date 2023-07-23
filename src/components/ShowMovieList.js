import React, { useState, useEffect } from 'react';
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

  const movieList = movies.length === 0 ? 'there is no movie record!' : movies.map((movie, k) => <MovieCard movie={movie} key={k} />);

  return (
    <div className='ShowMovieList'>
      <HelmetProvider>
      <Helmet>
        <title>Home | {window.$sitename}</title>
      </Helmet>
      </HelmetProvider>
      <h3>{window.$sitename}</h3>
      <Link to='/create-movie' className='btn'>Add movie</Link>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {movieList}
        </div>
      </div>

    </div>
  );

}

export default ShowMovieList;
