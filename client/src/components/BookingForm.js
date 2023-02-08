import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_APPT } from '../utils/mutations';
import { GET_PROVIDERS } from '../utils/queries';

const BookingForm = ({ providers }) => {
  const [providerId, setProviderId] = useState(null);
  const [appointmentFormData, setAppointmentFormData] = useState({
    provider: '',
    day: '',
    startTime: '',
    endTime: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addAppointment, { error }] = useMutation(ADD_APPT);
  const { data } = useQuery(GET_PROVIDERS);
  
  const providersData = data?.provider || {};
  console.log(data);
    // call to the "useMutation" hook with the "ADD_APPOINTMENT" mutation. It returns an object with a "error" property.
    // The fifth state variable, "providersData", is destructured from the data property returned by the call to the "useQuery" hook with the "GET_PROVIDERS" query.

  const [validated] = useState(false);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleSelectProvider = (selectedOption) => {
    setProviderId(selectedOption.value);
  };

  const handleSelectDay = (selectedOption) => {
    setAppointmentFormData({
      ...appointmentFormData,
      day: selectedOption.value,
    });
  };

  const handleTimeChange = (time) => {
    setAppointmentFormData({
      ...appointmentFormData,
      startTime: time[0],
      endTime: time[1],
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addAppointment({
        variables: {
          provider: providerId,
          day: appointmentFormData.day,
          startTime: appointmentFormData.startTime,
          endTime: appointmentFormData.endTime,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setAppointmentFormData({
      provider: '',
      day: '',
      startTime: '',
      endTime: '',
    });
  };

  const providerOptions = providersData.map((provider) => ({
    label: provider.providerDescription,
    value: provider.id,
  }));


    //     Pretty sure I don't need this actually... since pulling from providers.  
    //   const daysOptions = [
    //     { label: 'Monday', value: 'Monday' },
    //     { label: 'Tuesday', value: 'Tuesday' },
    //     { label: 'Wednesday', value: 'Wednesday' },
    //     { label: 'Thursday', value: 'Thursday' },
    //     { label: 'Friday', value: 'Friday' },
    //     { label: 'Saturday', value: 'Saturdayay'},
    //     { label: 'Sunday', value: 'Sunday' },
    //     { label: "Day", value: "day", disabled: true },
    //   ];


  return (
    <>
        <Form>
            <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            >
            Something went wrong with your appointment!
            </Alert>

            <Form.Group>
            <Form.Label htmlFor="provider">Select a Provider</Form.Label>
            <Select
                options={providerOptions}
                value={providerId}
                onChange={handleSelectProvider}
            />
            </Form.Group>

        
                <Form.Group>
                <Button type="submit" variant="success">Submit</Button>
            </Form.Group>
        </Form>
    </>
  );
}

export default BookingForm;