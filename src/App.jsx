import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselComponent from './components/CarouselComponent';
import SignIn from './components/SignIn';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarouselComponent />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search/:category" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
