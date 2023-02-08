import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { setContext } from "@apollo/client/link/context";
// import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import Page from "./components/Page";
// import Footer from "./components/Footer";
import Landing from "./components/Landing";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProviderForm from "./components/ProviderForm";
import UserProfiles from "./components/UserProfiles";
import ProviderProfile from "./components/ProviderProfile";
import BookingForm from "./components/BookingForm";
import "./App.css";

function App() {
  const [pages] = useState([
    {
      name: "Landing",
    },
    {
      name: "Signup",
    },
    {
      name: "Login",
    },
    {
      name: "Provider Profile",
    },
    {
      name: "User Profile",
    },
    {
      name: "Booking",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(pages[2]);

  // Construct our main GraphQL API endpoint
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/provider" element={<ProviderProfile />} />
            <Route path="/user" element={<UserProfiles />} />
            <Route path="/providerSignup" element={<ProviderForm />} />
            {/* <Route path="/providerCatalog" element={<ProviderCatalog />} /> */}
            <Route path="/BookingForm" element={<BookingForm />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
