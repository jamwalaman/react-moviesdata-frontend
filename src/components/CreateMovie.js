import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateMovie = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    description: '',
    release_date: '',
    production: '',
  });

  const onChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/movies', movie)
      .then((res) => {
        setMovie({
          title: '',
          director: '',
          description: '',
          release_date: '',
          production: '',
        });

        // Push to /
        navigate('/');
      })
      .catch((err) => {
        console.log('Error in CreateMovie!');
      });
  };

  return (
    <div className='CreateMovie'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Movie List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Movie</h1>
            <p className='lead text-center'>Create new movie</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
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
                <input
                  type='text'
                  placeholder='Director'
                  name='director'
                  className='form-control'
                  value={movie.director}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='About the movie'
                  name='description'
                  className='form-control'
                  value={movie.description}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='release_date'
                  name='release_date'
                  className='form-control'
                  value={movie.release_date}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of movie production'
                  name='production'
                  className='form-control'
                  value={movie.production}
                  onChange={onChange}
                />
              </div>

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;