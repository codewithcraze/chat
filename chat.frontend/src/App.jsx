import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';






// Pages.
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div className='dark'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
