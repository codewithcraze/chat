import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/assets/main.css';
import ThemeProvider from './hoc/theme.provider';

// Lazy load the pages
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));
const NotFound = React.lazy(() => import('./pages/not-found'));

// Loading spinner
import SyncLoader from 'react-spinners/SyncLoader';

// Route Guard
import { AuthGuard, GuardAuthEndpoint } from './hoc/auth.guard';

function App() {

  const routes = [
    { path: "/", element: <AuthGuard><Home /></AuthGuard> },
    { path: "/login", element: <GuardAuthEndpoint><Login /></GuardAuthEndpoint> },
    { path: "/register", element: <GuardAuthEndpoint><Register /></GuardAuthEndpoint> },
    { path: "*", element: <NotFound /> }
  ];

  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <SyncLoader color="#bf1d2c" speedMultiplier={2} />
          </div>
        }>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
