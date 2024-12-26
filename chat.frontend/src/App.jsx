import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/assets/main.css';
import ThemeProvider from './hoc/theme.provider';

// Lazy load the pages
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));

import RotateLoader from 'react-spinners/RotateLoader';



// Route Guard
import {AuthGuard, GuardAuthEndpoint} from './hoc/auth.guard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div className='flex justify-center items-center h-screen'>
          <RotateLoader color='#bf1d2c' />
        </div>}>
          <Routes>
            <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
            <Route path="/login" element={<GuardAuthEndpoint><Login /></GuardAuthEndpoint>} />
            <Route path="/register" element={<GuardAuthEndpoint>
              <Register />
            </GuardAuthEndpoint>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
