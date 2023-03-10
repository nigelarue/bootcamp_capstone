import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        isProvider
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $surName: String!
    $isProvider: Boolean!
    $dateOfBirth: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      surName: $surName
      isProvider: $isProvider
      dateOfBirth: $dateOfBirth
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROVIDER = gql`
  mutation addProvider(
    $buisnessName: String!
    $service: [String]
    $providerDescription: String
    $serviceDescription: String
    $username: String
    $schedule: [ScheduleInput]
    $apptLength: [Int]
  ) {
    addProvider(
      buisnessName: $buisnessName
      service: $service
      providerDescription: $providerDescription
      serviceDescription: $serviceDescription
      username: $username
      schedule: $schedule
      apptLength: $apptLength
    ) {
    token 
    }
  }
`;

export const ADD_APPT = gql`
  mutation addAppt(
    $userBooking: String
    $providerBooking: String
    $apptLength: Int
    $apptDate: String
    $createdAt: String
  ) {
    addAppt(
      userBooking: $userBooking
      providerBooking: $providerBooking
      apptLength: $apptLength
      apptDate: $apptDate
      createdAt: $createdAt
    ) {
      token
    }
  }
`;

export const REMOVE_APPT = gql`
  mutation removeAppt($appt: ID!) {
    removeAppt(Appt: $appt) {
      _id
      username
    }
  }
`;
