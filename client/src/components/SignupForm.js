import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate  = useNavigate();

  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    surName: '',
    dateOfBirth: '',
    isProvider: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(userFormData);
    if(userFormData.isProvider === "true"){
      userFormData.isProvider = true;
    } else {
      userFormData.isProvider = false;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);

      if(!userFormData.isProvider){
        Auth.login(data.addUser.token);
        navigate('/user', { replace: true });
      } else {
        Auth.login(data.addUser.token);
        navigate('/providerSignup', { replace: true });
        return;
      }

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      firstName: '',
      surName: '',
      dateOfBirth: '',
      isProvider: '',
    });

  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control className="mb-3" controlId="exampleForm.ControlInput1"
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control className="mb-3" controlId="exampleForm.ControlInput1"
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
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

        <Form.Group>
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your First Name"
            name="firstName"
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
          />
          <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="surName">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Surname"
            name="surName"
            onChange={handleInputChange}
            value={userFormData.surName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Surname is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="dateOfBirth">DOB</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            onChange={handleInputChange}
            value={userFormData.dateOfBirth}
            required
          />
          <Form.Control.Feedback type="invalid">
            Date of Birth is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="isProvider">Would you like to register as a Provider?</Form.Label>
          <Form.Control
            type="checkbox"
            name="isProvider"
            onChange={handleInputChange}
            value={true}
            required
          />
          <Form.Control.Feedback type="invalid">
            This field is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password &&
              userFormData.firstName &&
              userFormData.surName &&
              userFormData.dateOfBirth 
              //userFormData.isProvider
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;