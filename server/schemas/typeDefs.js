const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedAppts: [Appt]
    firstName: String
    surName: String
    dateOfBirth: String
    isProvider: Boolean!
  }

  input UserInput {
    username: String!
    email: String
    savedAppts: [ApptInput]
    firstName: String
    surName: String
    dateOfBirth: String
    isProvider: Boolean!
  }

  type Schedule {
    day: String
    startTime: String
    endTime: String
  }

  input ScheduleInput {
    day: String
    startTime: String
    endTime: String
  }

  type Provider {
    _id: ID!
    buisnessName: String
    service: [String]
    providerDescription: String
    serviceDescription: [String]
    username: String
    appointments: [Appt]
    schedule: [Schedule]
    apptLength: [Int]
  }

  type Appt {
    _id: ID!
    userBooking: String
    providerBooking: String
    apptLength: Int
    apptDate: String
    createdAt: String
  }

  input ApptInput {
    userBooking: String
    providerBooking: String
    apptLength: Int
    apptDate: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    providers: [Provider]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      surName: String!
      dateOfBirth: String
      isProvider: Boolean!
    ): Auth
    addProvider(
      buisnessName: String!
      service: [String]
      providerDescription: String
      serviceDescription: String
      username: String
      schedule: [ScheduleInput]
      apptLength: [Int]
    ): Auth
    addAppt(
      userBooking: String
      providerBooking: String
      apptLength: Int
      apptDate: String
      createdAt: String
    ): Auth
    removeAppt(Appt: ID!): User
  }
`;

module.exports = typeDefs;
