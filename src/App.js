import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='p-10'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
