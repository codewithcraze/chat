import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/assets/main.css';

// Pages.
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  const handleThemeChange = (event) => {
    if (event.target.checked) {
      document.body.classList.add('dark'); // Add dark mode
    } else {
      document.body.classList.remove('dark'); // Remove dark mode
    }
  };

  return (
    <div>
      <div className="switch">
        <input
          id="switch"
          className="switch__input"
          name="switch"
          type="checkbox"
          onChange={handleThemeChange}
        />
        <label className="switch__label" htmlFor="switch"></label>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
