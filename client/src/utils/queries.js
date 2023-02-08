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

// query to pull APPT times from a Provider

// export const GET_APPT_TIMES = gql`
//   query availableApptTimes($providerBooking: String, $apptDate: String) {
//     availableApptTimes(providerBooking: $providerBooking, apptDate: $apptDate) {
//       startTime
//       endTime
//     }
//   }
// `;
