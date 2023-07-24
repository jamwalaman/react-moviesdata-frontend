import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const { DateTime } = require("luxon"); //for date handling

function ShowMovieDetails(props) {
  const [movie, setMovie] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowMovieDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8000/api/movies/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowMovieDetails_deleteClick');
      });
  };

  return (
    <div className='ShowMovieDetails'>
      <HelmetProvider>
      <Helmet>
        <title>{ `${movie.title}` } | {window.$sitename}</title>
      </Helmet>
      </HelmetProvider>
      <div className='container'>
        <div className='row'>
          
          <div className='col-md-8 m-auto mt-4'>
            <Link to='/' className='btn btn-outline-primary'>Show Movie List</Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Movie's Record</h1>
            <p className='lead text-center'>{movie.title} | Directed by {movie.director}</p>
            <hr />
          </div>
          <div className='col-md-8 m-auto'>
            <p><strong>Synopsis:</strong> {movie.synopsis}</p>
            <p><strong>Release date:</strong> {DateTime.fromISO(movie.release_date).toFormat('dd MMMM yyyy')}</p>
            <p><strong>Production:</strong> {movie.production}</p>
            <div className='d-grid gap-2 d-md-flex'>
              <button
              type='button'
              className='btn btn-outline-danger'
              onClick={() => {
                onDeleteClick(movie._id);
              }}
            >
              Delete Movie
            </button>
              <Link to={`/edit-movie/${movie._id}`} className='btn btn-outline-secondary'>
                Edit Movie
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ShowMovieDetails;