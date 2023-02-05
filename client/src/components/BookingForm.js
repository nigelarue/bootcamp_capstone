import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const BookingForm = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch the available services from the API
    fetch('api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(err => setError(err));
  }, []);

  const handleServiceChange = event => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // fetch the availability for the selected service from the API
    fetch(`api/availability?serviceId=${selectedService}`)
      .then(response => response.json())
      .then(data => setAvailability(data))
      .catch(err => setError(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="service">
        <Form.Label>Select a Service</Form.Label>
        <Form.Control as="select" onChange={handleServiceChange}>
          <option value="">Please select a service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button type="submit">Show Availability</Button>
      {error && (
        <Alert variant="danger">
          An error occurred while fetching the services or availability.
        </Alert>
      )}
      {availability.length > 0 && (
        <div>
          <h3>Availability for {selectedService}</h3>
          <ul>
            {availability.map(time => (
              <li key={time}>{time}</li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
};

export default BookingForm;
