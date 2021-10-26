import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../index.css";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("failed to log in");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="card-div">
        <h2 className="text-center">Log in</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="border border-secondary bg-light text-dark"
              ref={emailRef}
              required
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="border border-secondary bg-light text-dark"
              ref={passwordRef}
              required
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 my-4" type="submit">
            Log in
          </Button>
        </Form>
        <div className="forgot-password">
          <Link to="forgot-password">Forgot password?</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
