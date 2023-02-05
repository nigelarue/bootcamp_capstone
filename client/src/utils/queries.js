import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedAppts {
        userBooking
        providerBooking
        apptLength
        apptDate
      }
      firstName
      surName
      dateOfBirth
      isProvider
    }
  }
`;
