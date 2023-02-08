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
    mondayRange: '',
    tuesdayRange: '',
    wednesdayRange: '',
    thursdayRange: '',
    fridayRange: '',
    saturdayRange: '',
    sundayRange: '',
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

  const handleDays = (days) => {
    const dayInput = [];
    days.forEach(element => dayInput.push(element.value));
    setProviderFormData({ ...providerFormData, ["availableDays"]: dayInput });

    // if(days.find(e => e.label === 'Monday')){
    //   console.log("Monday");
    // } 
    // if(days.find(e => e.label === 'Tuesday')){
    //   console.log("Tuesday");
    // } 
    // if(days.find(e => e.label === 'Wednesday')){
    //   console.log("Wednesday");
    // } 
    // if(days.find(e => e.label === 'Thursday')){
    //   console.log("Thursday");
    // } 
    // if(days.find(e => e.label === 'Friday')){
    //   console.log("Friday");
    // } 
    // if(days.find(e => e.label === 'Saturday')){
    //   console.log("Saturday");
    // } 
    // if(days.find(e => e.label === 'Sunday')){
    //   console.log("Sunday");
    // } 
  };

  //Logic for retriving the schedule from the form
  const handleTimesMO = (times) => {
    let timeFrom = document.getElementsByName("monday_from");
    let timeTo =  document.getElementsByName("monday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["mondayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesTU = (times) => {
    let timeFrom = document.getElementsByName("tuesday_from");
    let timeTo =  document.getElementsByName("tuesday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["tuesdayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesWE = (times) => {
    let timeFrom = document.getElementsByName("wednesday_from");
    let timeTo =  document.getElementsByName("wednesday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["wednesdayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesTH = (times) => {
    let timeFrom = document.getElementsByName("thursday_from");
    let timeTo =  document.getElementsByName("thursday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["thursdayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesFR = (times) => {
    let timeFrom = document.getElementsByName("friday_from");
    let timeTo =  document.getElementsByName("friday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["fridayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesSA = (times) => {
    let timeFrom = document.getElementsByName("saturday_from");
    let timeTo =  document.getElementsByName("saturday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["saturdayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }
  const handleTimesSU = (times) => {
    let timeFrom = document.getElementsByName("sunday_from");
    let timeTo =  document.getElementsByName("sunday_to");
    
    if(times[0]){
      timeFrom[0].value = times[0];
    } else if (times[1]){
      timeTo[0].value = times[1];
    }

    setProviderFormData({ ...providerFormData, ["sundayRange"]: {startTime: timeFrom[0].value, endTime: timeTo[0].value} });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProviderFormData({ ...providerFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(providerFormData);
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addProvider({
        variables: { ...providerFormData },
      },
      localStorage.getItem("id_token")
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setProviderFormData({
        service: '',
        providerDescription: '',
        serviceDescription: '',
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
            options={[{label: "Monday", value: "Monday"}, 
                      {label: "Tuesday", value: "Tuesday"}, 
                      {label: "Wednesday", value: "Wednesday"},
                      {label: "Thursday", value: "Thursday"},
                      {label: "Friday", value: "Friday"},
                      {label: "Saturday", value: "Saturday"},
                      {label: "Sunday", value: "Sunday"},]}
            className="basic-multi-select"
            onChange={handleDays}
            classNamePrefix="select"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Monday?</Form.Label>
          <TimeRangePicker name="monday" onChange={handleTimesMO} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Tuesday?</Form.Label>
          <TimeRangePicker name="tuesday" onChange={handleTimesTU} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Wednesday?</Form.Label>
          <TimeRangePicker name="wednesday" onChange={handleTimesWE} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Thursday?</Form.Label>
          <TimeRangePicker name="thursday" onChange={handleTimesTH} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Friday?</Form.Label>
          <TimeRangePicker  name="friday" onChange={handleTimesFR} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Saturday?</Form.Label>
          <TimeRangePicker name="saturday" onChange={handleTimesSA} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="schedule">When are you available on Sunday?</Form.Label>
          <TimeRangePicker name="sunday" onChange={handleTimesSU} />
        </Form.Group>

        <Button
          disabled={
            !(
              providerFormData.providerDescription &&
              providerFormData.service &&
              providerFormData.serviceDescription 
              // providerFormData.availableDays
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
