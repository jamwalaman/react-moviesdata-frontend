import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "@fontsource/inter";
import './main.scss';

import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import UpdateMovieInfo from './components/UpdateMovieInfo';

window.$sitename = "Movies Data";

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
