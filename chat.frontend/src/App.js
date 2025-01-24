import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ClientHome from "./pages/customer.chat";
import NavigateCustomer from './pages/navigate.customer';
import RouteGuard from "./hoc/route.guard";

//socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);


function App() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  return (
    <div className="">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                (token && !user.client) ? <Home socket={socket} /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={<Login />}
            />
            <Route
              exact
              path="/register"
              element={<Register />}
            />
            <Route
              exact
              path="/chat"
              element={
                <ClientHome socket={socket} />
              }
            />
            <Route
              exact
              path="/c/:shortId"
              element={
                <NavigateCustomer />
              }
            />

          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );

}

export default App;
