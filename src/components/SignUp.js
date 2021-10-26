import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setLoading(true);
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/login");
    } catch {
      setError("failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="card-div">
        <h2 className="text-center">Sign up</h2>
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
            <Form.Label>Password (min 8 characters)</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              className="border border-secondary bg-light text-dark"
              required
            />
          </Form.Group>
          <Form.Group id="passsword-confirm">
            <Form.Label>Passsword Confirmation</Form.Label>
            <Form.Control
              type="password"
              className="border border-secondary bg-light text-dark"
              ref={passwordConfirmRef}
              required
            />
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100 my-4 bg-primary"
            type="submit"
          >
            Sign up
          </Button>
        </Form>
        <div className="account-redirect">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </>
  );
}
