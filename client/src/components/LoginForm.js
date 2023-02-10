import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const LoginForm = ({ setCurrentPage }) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token, data.login.user.isProvider);
      if (data.login.user.isProvider) {
        window.location.assign("/provider");
      } else {
        window.location.assign("/user");
      }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  const styles = {
    buttonContainer: {
      display: "flex",
      width: "50%",
      margin: "auto",
      justifyContent: "center"
    },
    formGroup: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "50px",
      width: "35%",
      margin: "auto"
    },
    formControl: {
      display: "flex",
      bordeRadius: "50px",
      margin: "auto",
      borderRadius: "50px",
      width: "600px"
    },
    button: {
      width: "200px",
      padding: "10px",
      margin: "5px",
      borderRadius: "50px",
      backgroundColor: "#b83d22",
      fontWeight: "500",
      border: "none",
      outline: "none",
      cursor: "pointer"
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group style={styles.formGroup}>
          <Form.Label className="style__form-label" htmlFor="email">Email</Form.Label>
          <Form.Control style={styles.formControl} 
            className="mb-3" controlId="exampleForm.ControlInput1"
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback className="style__form-input" type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={styles.formGroup}>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control style={styles.formControl}  
            className="mb-3"
           controlId="exampleForm.ControlInput1"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <div style={styles.buttonContainer}>
          <Button
            style={styles.button}
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
