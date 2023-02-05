import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PROVIDER } from '../utils/mutations';

const ProviderForm = () => {
  // set initial form state
  const [providerFormData, setProviderFormData] = useState({
    service: '',
    providerDescription: '',
    serviceDescription: '',
    schedule: '',
    apptLength: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addProvider, { error }] = useMutation(ADD_PROVIDER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...providerFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addProvider({
        variables: { ...providerFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setProviderFormData({
        service: '',
        providerDescription: '',
        serviceDescription: '',
        schedule: '',
        apptLength: '',
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
          <Form.Label htmlFor="providerDescription">Describe yourself for clients</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="A description of yourself"
            name="providerDescription"
            onChange={handleInputChange}
            value={providerFormData.providerDescription}
            required
          />
          <Form.Control.Feedback type="invalid">
            The description is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="service">What service will you be providing?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Service"
            name="service"
            onChange={handleInputChange}
            value={providerFormData.service}
            required
          />
          <Form.Control.Feedback type="invalid">
            A service is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="serviceDescription">Describe the service you will be providing</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Service Description"
            name="serviceDescription"
            onChange={handleInputChange}
            value={providerFormData.serviceDescription}
            required
          />
          <Form.Control.Feedback type="invalid">
            A service description is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available for appointments</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Schedule"
            name="schedule"
            onChange={handleInputChange}
            value={providerFormData.schedule}
            required
          />
          <Form.Control.Feedback type="invalid">
            A schedule is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="apptLength">What appointment lengths will you offer?</Form.Label>
          <Form.Control
            type="select"
            name="apptLength"
            onChange={handleInputChange}
            value={providerFormData.apptLength}
            required
          />
          <option>15</option>
          <option>30</option>
          <option>60</option>
          <option>120</option>
          <Form.Control.Feedback type="invalid">
            An appointment length is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              providerFormData.providerDescription &&
              providerFormData.service &&
              providerFormData.serviceDescription
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

export default ProviderForm;
