import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const { DateTime } = require("luxon"); //for date handling

function UpdateMovieInfo(props) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    synopsis: '',
    release_date: '',
    production: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((res) => {
        setMovie({
          title: res.data.title,
          director: res.data.director,
          synopsis: res.data.synopsis,
          release_date: res.data.release_date,
          production: res.data.production,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateMovieInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: movie.title,
      director: movie.director,
      synopsis: movie.synopsis,
      release_date: movie.release_date,
      production: movie.production,
    };

    axios
      .put(`http://localhost:8000/api/movies/${id}`, data)
      .then((res) => {
        navigate(`/show-movie/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateMovieInfo!');
      });
  };

  return (
    <div className='UpdateMovieInfo'>
      <HelmetProvider>
      <Helmet>
        <title>{ `Edit - ${movie.title}` } | {window.$sitename}</title>
      </Helmet>
      </HelmetProvider>
      <div className='container'>

        <div className='row'>
          <div className='col-md-8 m-auto mt-4'>
            <Link to='/' className='btn btn-outline-primary'>Show Movie List</Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Movie</h1>
            <p className='lead text-center'>Update Movie's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title of the Movie'
                name='title'
                className='form-control'
                value={movie.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='director'>Director</label>
              <input
                type='text'
                placeholder='Director'
                name='director'
                className='form-control'
                value={movie.director}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='synopsis'>Synopsis</label>
              <textarea 
                rows='3'
                placeholder='Movie plot summary'
                name='synopsis'
                className='form-control'
                value={movie.synopsis}
                onChange={onChange}>
              </textarea>
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='release_date'>Release Date</label>
              <input
                type='date'
                name='release_date'
                placeholder="yyyy-mm-dd"
                className='form-control'
                value={DateTime.fromISO(movie.release_date).toFormat('yyyy-LL-dd')}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='production'>Production</label>
              <input
                type='text'
                placeholder='Production'
                name='production'
                className='form-control'
                value={movie.production}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='d-grid gap-2 d-md-flex'>
              <button type='submit' className='btn btn-outline-info'>Update Movie</button>
              <Link to={`/show-movie/${id}`} className='btn btn-outline-secondary'>Go back</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UpdateMovieInfo;