import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import UpdateMovieInfo from './components/UpdateMovieInfo';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowMovieList />} />
          <Route path='/create-movie' element={<CreateMovie />} />
          <Route path='/edit-movie/:id' element={<UpdateMovieInfo />} />
          <Route path='/show-movie/:id' element={<ShowMovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
