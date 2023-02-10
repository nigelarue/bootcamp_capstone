import React from "react";
import { Container, CardColumns, Card, Button } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_APPT } from "../utils/mutations";


import Auth from "../utils/auth";

const UserProfiles = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeAppt, { error }] = useMutation(REMOVE_APPT);

  const userData = data?.me || {};

  // create function that accepts the appt's mongo _id value as param and deletes the appt from the database
  const handleDeleteAppt = async (apptId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeAppt({
        variables: { apptId },
      });

      // upon success, remove appt's id from localStorage
      //   removeappt(apptId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <h2>
          {userData.savedAppts?.length
            ? `Viewing ${userData.savedAppts.length} saved ${
                userData.savedAppts.length === 1
                  ? "Appointments"
                  : "Appointments"
              }:`
            : "You have no saved Appointments!"}
        </h2>
        <CardColumns>
          {userData.savedAppts?.map((appt) => {
            return (
              <Card key={appt.apptId} border="dark">
                <Card.Body>
                  <Card.Title>{appt.userBooking}</Card.Title>
                  <p className="small">Provider: {appt.providerBooking}</p>
                  <p className="small">Appointment Length: {appt.apptLength}</p>
                  <p className="small">Appointment Date: {appt.apptDate}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteAppt(appt.apptId)}
                  >
                    Cancel this Appointment!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default UserProfiles;
