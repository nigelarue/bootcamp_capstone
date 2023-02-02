const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        savedAppts: [apptSchema]
        firstName: String
        surName: String
        dateOfBirth: [Date]
        isProvider: Boolean!
    }

    type Provider {
        _id: ID!
        service: [String]
        providerDescription: String
        serviceDescription: [String]
        user: userSchema
        appointments: [apptSchema]
        schedule: [day: String
                   startTime: Int
                   endTime: Int]
        apptLength: [Int]
    }

    type Appt {
        _id: ID!
        userBooking: ID
        providerBooking: ID
        apptLength: Int
        apptDate: Date
        createdAt: Date
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, firstName: String, surName: String, 
            dateOfBirth: [Date], isProvider: Boolean!): Auth
        addProvider(service: [String], providerDescription: String, serviceDescription: String, user: userSchema, 
            schedule: [day: String, startTime: Int, endTime: Int], apptLength: [Int]): Auth
        addAppt(userBooking: ID, providerBooking: ID, apptLength: Int, apptDate: Date, createdAt: Date): User
        removeAppt(Appt: ID): User
    }
`;