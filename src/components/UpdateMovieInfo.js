import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateMovieInfo(props) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    description: '',
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
          description: res.data.description,
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
      description: movie.description,
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
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Movie List
            </Link>
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
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                placeholder='Movie plot summary'
                name='description'
                className='form-control'
                value={movie.description}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='release_date'>Release Date</label>
              <input
                type='date'
                name='release_date'
                className='form-control'
                value={movie.release_date}
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

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMovieInfo;