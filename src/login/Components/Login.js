import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "./Header";
import classes from "./Register.module.css";
import Config from "../../config/Config.json";
import API_URL from "../../config/config"

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [backendErrors, setBackendErrors] = useState({
    show: false,
    message: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Config.TITLE.LOGIN;
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      setBackendErrors({
        show: false,
        message: "",
      });

      axios
        .post(`${API_URL}/auth/login`, inputs)
        .then((res) => {
          const token = res.data.token;

          dispatch({
            type: "SETAUTHTOKEN",
            data: token,
          });

          console.log("Login Successful ✅");
        })
        .catch((err) => {
          console.log(err);

          if (err.response) {
            const statusCode = err.response.status;

            if (statusCode === 401 || statusCode === 422) {
              setBackendErrors({
                show: true,
                message: "Incorrect Email or Password",
              });
            } else {
              setBackendErrors({
                show: true,
                message: "Server Error",
              });
            }
          } else {
            setBackendErrors({
              show: true,
              message: "Backend server not running",
            });
          }
        });
    }
  };

  // ================= VALIDATION =================

  const validate = () => {
    let isValid = true;
    let error = {};

    // EMAIL VALIDATION

    if (!inputs.email) {
      isValid = false;
      error.email = "Please enter your email address.";
    }

    if (inputs.email) {
      const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!pattern.test(inputs.email)) {
        isValid = false;
        error.email = "Please enter valid email address.";
      }
    }

    // PASSWORD VALIDATION

    if (!inputs.password) {
      isValid = false;
      error.password = "Please enter your password.";
    }

    if (inputs.password && inputs.password.length < 6) {
      isValid = false;
      error.password = "Password must be at least 6 characters.";
    }

    setErrors(error);

    return isValid;
  };

  return (
    <React.Fragment>
      <Header />

      <Container className="mb-5">
        <h1
          className="p-3 text-center rounded"
          style={{ color: "#2c49ed" }}
        >
          Login to your Job Portal
        </h1>

        <Row className="mb-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className={`${classes.formContainer} p-5 m-auto shadow-sm rounded-lg`}
          >
            {/* ================= BACKEND ERROR ================= */}

            {backendErrors.show && (
              <div className="login-error">
                {backendErrors.message}
              </div>
            )}

            {/* ================= LOGIN FORM ================= */}

            <Form onSubmit={handleSubmit}>
              {/* EMAIL */}

              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>
                  Email{" "}
                  <span style={{ color: "red" }}>
                    *
                  </span>
                </Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={inputs.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

                <p style={{ color: "red" }}>
                  {errors.email}
                </p>
              </Form.Group>

              {/* PASSWORD */}

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>
                  Password{" "}
                  <span style={{ color: "red" }}>
                    *
                  </span>
                </Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={inputs.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <p style={{ color: "red" }}>
                  {errors.password}
                </p>
              </Form.Group>

              {/* LOGIN BUTTON */}

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="mt-4 mb-2"
                >
                  Log-In
                </Button>
              </div>

              {/* FORGOT PASSWORD */}

              <Col lg={5} md={6} sm={12}>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/Reset"
                >
                  Forgot Password?
                </Link>
              </Col>

              {/* REGISTER */}

              <div>
                <Row>
                  <Col lg={5} md={6} sm={12}>
                    <Form.Label className="mt-5">
                      Don't have an account?
                    </Form.Label>
                  </Col>

                  <Col
                    lg={5}
                    md={6}
                    sm={12}
                    className="mt-5 d-flex justify-content-center"
                  >
                    <Link to="/Register">
                      <Button
                        variant="success"
                        size="lg"
                      >
                        Sign-up
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;