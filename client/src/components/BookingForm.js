import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_APPT, REMOVE_APPT } from '../utils/mutations';
import { gql } from '@apollo/client'
// check to be sure useQuery @apollo/react-hooks installed
// request available appointment data from provider

const GET_APPT_TIMES = gql`
    query getApptTimes {
        getApptTimes {
            time
        }
    }
`;

function AppointmentForm() {
    const { data, loading, error } = useQuery(GET_APPT_TIMES);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (!loading && data) {
            setSelectedTime(data.getApptTimes[0].time);
        }
    }, [data, loading]);

    return (
        <form>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
                    <label htmlFor="appt-time">Appointment Time:</label>
                    <select id="appt-time" onChange={e => setSelectedTime(e.target.value)} value={selectedTime}>
                        {data.getApptTimes.map(time => (
                            <option key={time.time} value={time.time}>
                                {time.time}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </form>
    );
}

export default AppointmentForm;