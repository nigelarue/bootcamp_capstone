import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

import { useMutation } from '@apollo/client';
import { ADD_PROVIDER } from '../utils/mutations';

const ProviderForm = () => {
  // set initial form state
  const [providerFormData, setProviderFormData] = useState({
    service: '',
    providerDescription: '',
    serviceDescription: '',
    availableDays: '',
    apptLength: '',
  });
  const [value, onChange] = useState(['10:00', '11:00']);
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

  const handleDays = (days) => {
    days.forEach(element => console.log(element));

    if(days.find(e => e.label === 'Monday')){
      console.log("Monday");
    } 
    if(days.find(e => e.label === 'Tuesday')){
      console.log("Tuesday");
    } 
    if(days.find(e => e.label === 'Wednesday')){
      console.log("Wednesday");
    } 
    if(days.find(e => e.label === 'Thursday')){
      console.log("Thursday");
    } 
    if(days.find(e => e.label === 'Friday')){
      console.log("Friday");
    } 
    if(days.find(e => e.label === 'Saturday')){
      console.log("Saturday");
    } 
    if(days.find(e => e.label === 'Sunday')){
      console.log("Sunday");
    } 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProviderFormData({ ...providerFormData, [name]: value });
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
          <Form.Label htmlFor="providerDescription">Describe your service for clients</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="A description of your service"
            name="serviceDescription"
            onChange={handleInputChange}
            value={providerFormData.serviceDescription}
            required
          />
          <Form.Control.Feedback type="invalid">
            The description is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
        <Form.Label htmlFor="schedule">What appointment lengths would you like to offer?</Form.Label>
          <Select
            defaultValue="Select appointment times"
            isMulti
            name="apptTimes"
            options={[{label: "15 minutes", value: "15"}, 
                      {label: "30 minutes", value: "30"}, 
                      {label: "60 minutes", value: "60"},
                      {label: "90 minutes", value: "90"},
                      {label: "120 minutes", value: "120"}]}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">What days are you available for appointments</Form.Label>
          <Select
            isMulti
            name="availableDays"
            options={[{label: "Monday", value: "0"}, 
                      {label: "Tuesday", value: "1"}, 
                      {label: "Wednesday", value: "2"},
                      {label: "Thursday", value: "3"},
                      {label: "Friday", value: "4"},
                      {label: "Saturday", value: "5"},
                      {label: "Sunday", value: "6"},]}
            className="basic-multi-select"
            onChange={handleDays}
            classNamePrefix="select"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Monday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Tuesday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Wednesday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Thursday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Friday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Saturday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Sunday?</Form.Label>
          <TimeRangePicker onChange={onChange} value={value} />
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
