import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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

  const moviedate = new Date(movie.release_date);

  const MovieItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Movie Title</td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Director</td>
            <td>{movie.director}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Description</td>
            <td>{movie.description}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Release Date</td>
            <td>{moviedate.getFullYear()}/{moviedate.getMonth()+1}/{moviedate.getDate()}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Production</td>
            <td>{movie.production}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowMovieDetails'>
      <HelmetProvider>
      <Helmet>
        <title>{ `${movie.title}` } | {window.$sitename}</title>
      </Helmet>
      </HelmetProvider>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Movie List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Movie's Record</h1>
            <p className='lead text-center'>View Movie's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{MovieItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(movie._id);
              }}
            >
              Delete Movie
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-movie/${movie._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Movie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMovieDetails;