import React, { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import Movies from "./components/Movies";
import LogIn from "./components/LogIn";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../src/Context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Movies} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}
